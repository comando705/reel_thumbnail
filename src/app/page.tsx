'use client';

import { useState, useEffect } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import dynamic from 'next/dynamic';
import { TextEditor } from '@/components/TextEditor';

const DynamicCanvas = dynamic(
  () => import('@/components/Canvas').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="border rounded-lg p-4 flex items-center justify-center h-[600px]">
        Loading Canvas...
      </div>
    )
  }
);

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const handleImageUpload = (urls: string[]) => {
    console.log('이미지 업로드 완료:', urls);
    setImages(urls);
    if (urls.length > 0) {
      console.log('첫 번째 이미지 선택:', urls[0]);
      setCurrentImage(urls[0]);
    }
  };

  const handleAddText = (text: string, options: { fontSize: number; color: string }) => {
    console.log('텍스트 추가:', text, options);
    setText(text);
  };

  // currentImage 상태 변경 감지
  useEffect(() => {
    console.log('현재 선택된 이미지:', currentImage);
  }, [currentImage]);

  // images 상태 변경 감지
  useEffect(() => {
    console.log('업로드된 이미지 목록:', images);
  }, [images]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">리얼 썸네일 메이커</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <ImageUploader onUploadComplete={handleImageUpload} />
            <TextEditor onAddText={handleAddText} />
            {images.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">업로드된 이미지</h2>
                <div className="grid grid-cols-2 gap-2">
                  {images.map((url, index) => (
                    <img
                      key={url}
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-auto rounded cursor-pointer hover:opacity-75 transition-opacity"
                      onClick={() => setCurrentImage(url)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="border rounded-lg p-4">
            <DynamicCanvas 
              width={800}
              height={600}
              backgroundColor="#ffffff"
              imageUrl={currentImage}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 