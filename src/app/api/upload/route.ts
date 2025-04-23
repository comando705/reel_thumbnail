import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');

export async function POST(request: NextRequest) {
  try {
    // 업로드 디렉토리가 없으면 생성
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: '업로드할 파일이 없습니다.' },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { error: '최대 5개의 파일만 업로드할 수 있습니다.' },
        { status: 400 }
      );
    }

    const uploadPromises = files.map(async (file) => {
      // 파일 이름에 uuid를 추가하여 중복 방지
      const filename = `${uuidv4()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = join(UPLOAD_DIR, filename);
      
      // 파일 내용을 버퍼로 변환
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // 파일 쓰기
      await writeFile(filePath, buffer);
      
      // 클라이언트에서 접근 가능한 URL 생성
      return `/uploads/${filename}`;
    });

    const urls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls });
  } catch (error) {
    console.error('파일 업로드 오류:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 