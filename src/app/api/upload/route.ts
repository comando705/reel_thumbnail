import { NextResponse } from 'next/server';
import { StorageService } from '@/lib/storage';
import { StorageConfig } from '@/types/storage';

const getStorageConfig = (): StorageConfig => {
  const storageType = process.env.STORAGE_TYPE as 'local' | 's3' || 'local';

  if (storageType === 's3') {
    return {
      type: 's3',
      s3: {
        region: process.env.AWS_REGION!,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
        bucketName: process.env.AWS_S3_BUCKET_NAME!,
      },
    };
  }

  return { type: 'local' };
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    const storageService = new StorageService(getStorageConfig());
    const url = await storageService.uploadFile(file);

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
} 