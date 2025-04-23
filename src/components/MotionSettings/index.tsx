'use client';

import React, { useState } from 'react';
import { MotionType, MotionSettings, ImageData } from '@/types/motion';

interface MotionSettingsProps {
  image: ImageData;
  onUpdateMotion: (id: string, motion: MotionSettings) => void;
}

export function MotionSettingsPanel({ image, onUpdateMotion }: MotionSettingsProps) {
  const [activeTab, setActiveTab] = useState<'type' | 'duration' | 'delay'>('type');
  
  const motionTypes: { value: MotionType; label: string; description: string }[] = [
    { value: 'none', label: '없음', description: '모션 효과를 적용하지 않습니다.' },
    { value: 'slideLeft', label: '좌로 슬라이드', description: '이미지가 오른쪽에서 왼쪽으로 이동합니다.' },
    { value: 'slideRight', label: '우로 슬라이드', description: '이미지가 왼쪽에서 오른쪽으로 이동합니다.' },
    { value: 'slideUp', label: '위로 슬라이드', description: '이미지가 아래에서 위로 이동합니다.' },
    { value: 'slideDown', label: '아래로 슬라이드', description: '이미지가 위에서 아래로 이동합니다.' },
    { value: 'zoomIn', label: '확대', description: '이미지가 작은 크기에서 원래 크기로 확대됩니다.' },
    { value: 'zoomOut', label: '축소', description: '이미지가 큰 크기에서 원래 크기로 축소됩니다.' },
    { value: 'fadeIn', label: '페이드 인', description: '이미지가 투명에서 불투명하게 변합니다.' },
    { value: 'fadeOut', label: '페이드 아웃', description: '이미지가 불투명에서 투명하게 변합니다.' },
    { value: 'rotate', label: '회전', description: '이미지가 회전합니다.' },
  ];

  const handleTypeChange = (type: MotionType) => {
    onUpdateMotion(image.id, {
      ...image.motion,
      type
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(e.target.value);
    onUpdateMotion(image.id, {
      ...image.motion,
      duration
    });
  };

  const handleDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const delay = parseInt(e.target.value);
    onUpdateMotion(image.id, {
      ...image.motion,
      delay
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4">
        이미지 {image.order + 1} 모션 설정
      </h3>
      
      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'type' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('type')}
          >
            모션 유형
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'duration' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('duration')}
          >
            지속 시간
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm ${activeTab === 'delay' ? 'border-b-2 border-indigo-500 text-indigo-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('delay')}
          >
            지연 시간
          </button>
        </div>
        
        <div className="mt-4">
          {activeTab === 'type' && (
            <div className="grid grid-cols-2 gap-2">
              {motionTypes.map((motion) => (
                <button
                  key={motion.value}
                  className={`p-3 border rounded-lg text-left ${
                    image.motion.type === motion.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleTypeChange(motion.value)}
                >
                  <div className="font-medium">{motion.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{motion.description}</div>
                </button>
              ))}
            </div>
          )}
          
          {activeTab === 'duration' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                지속 시간: {image.motion.duration}ms
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={image.motion.duration}
                onChange={handleDurationChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>빠름 (100ms)</span>
                <span>중간 (1000ms)</span>
                <span>느림 (5000ms)</span>
              </div>
            </div>
          )}
          
          {activeTab === 'delay' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                지연 시간: {image.motion.delay}ms
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={image.motion.delay}
                onChange={handleDelayChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>없음 (0ms)</span>
                <span>중간 (1000ms)</span>
                <span>길게 (5000ms)</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 rounded-lg mt-2">
        <div className="text-sm font-medium">미리보기</div>
        <div className="text-xs text-gray-500 mb-2">
          {motionTypes.find(m => m.value === image.motion.type)?.description || '모션 없음'}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>지속 시간: {image.motion.duration}ms</span>
          <span>지연 시간: {image.motion.delay}ms</span>
        </div>
      </div>
    </div>
  );
} 