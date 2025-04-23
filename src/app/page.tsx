'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ImageUploader } from '@/components/ImageUploader';
import { MotionSettingsPanel } from '@/components/MotionSettings';
import { WatermarkSettingsPanel } from '@/components/WatermarkSettings';
import { ImageData, MotionSettings, WatermarkSettings } from '@/types/motion';

// Canvas 컴포넌트를 클라이언트 사이드에서만 렌더링
const DynamicCanvas = dynamic(
  () => import('@/components/Canvas').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => (
      <div className="border rounded-lg p-4 flex items-center justify-center h-[600px]">
        Canvas 로딩 중...
      </div>
    )
  }
);

export default function Home() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [watermark, setWatermark] = useState<WatermarkSettings>({
    enabled: false,
    text: '리얼 썸네일 메이커',
    position: 'bottomRight',
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.7
  });

  // 이미지 업로드 핸들러
  const handleImageUpload = (uploadedImages: ImageData[]) => {
    console.log('이미지 업로드 완료:', uploadedImages);
    setImages(uploadedImages);
    
    if (uploadedImages.length > 0 && !selectedImage) {
      setSelectedImage(uploadedImages[0]);
    }
  };

  // 모션 업데이트 핸들러
  const handleUpdateMotion = (id: string, motion: MotionSettings) => {
    const updatedImages = images.map(img => 
      img.id === id ? { ...img, motion } : img
    );
    setImages(updatedImages);
    
    if (selectedImage && selectedImage.id === id) {
      setSelectedImage({ ...selectedImage, motion });
    }
  };

  // 워터마크 업데이트 핸들러
  const handleUpdateWatermark = (settings: WatermarkSettings) => {
    setWatermark(settings);
  };

  // 이미지 선택 핸들러
  const handleSelectImage = (image: ImageData) => {
    setSelectedImage(image);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">리얼 썸네일 메이커</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 사이드바: 설정 패널 */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUploader 
              onUploadComplete={handleImageUpload}
              maxImages={5}
            />
            
            {selectedImage && (
              <MotionSettingsPanel
                image={selectedImage}
                onUpdateMotion={handleUpdateMotion}
              />
            )}
            
            <WatermarkSettingsPanel
              watermark={watermark}
              onUpdateWatermark={handleUpdateWatermark}
            />
          </div>
          
          {/* 오른쪽: 미리보기 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-4">미리보기</h2>
              
              <DynamicCanvas 
                width={800}
                height={600}
                backgroundColor="#ffffff"
                images={images}
                watermark={watermark}
              />
              
              {images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">업로드된 이미지</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {images.map((image) => (
                      <div 
                        key={image.id}
                        className={`border rounded overflow-hidden cursor-pointer ${
                          selectedImage?.id === image.id ? 'ring-2 ring-indigo-500' : ''
                        }`}
                        onClick={() => handleSelectImage(image)}
                      >
                        <div className="aspect-w-16 aspect-h-9 relative">
                          <img
                            src={image.url}
                            alt={`이미지 ${image.order + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-1">
                            {image.order + 1}
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                            {image.motion.type !== 'none' ? image.motion.type : '모션 없음'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 