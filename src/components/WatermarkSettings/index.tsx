'use client';

import React, { useState } from 'react';
import { WatermarkSettings } from '@/types/motion';

interface WatermarkSettingsPanelProps {
  watermark: WatermarkSettings;
  onUpdateWatermark: (settings: WatermarkSettings) => void;
}

export function WatermarkSettingsPanel({ watermark, onUpdateWatermark }: WatermarkSettingsPanelProps) {
  const positions = [
    { value: 'topLeft', label: '왼쪽 상단' },
    { value: 'topRight', label: '오른쪽 상단' },
    { value: 'bottomLeft', label: '왼쪽 하단' },
    { value: 'bottomRight', label: '오른쪽 하단' },
    { value: 'center', label: '중앙' },
  ];

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateWatermark({
      ...watermark,
      text: e.target.value
    });
  };

  const handleEnableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateWatermark({
      ...watermark,
      enabled: e.target.checked
    });
  };

  const handlePositionChange = (position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center') => {
    onUpdateWatermark({
      ...watermark,
      position
    });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateWatermark({
      ...watermark,
      fontSize: parseInt(e.target.value)
    });
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateWatermark({
      ...watermark,
      color: e.target.value
    });
  };

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateWatermark({
      ...watermark,
      opacity: parseFloat(e.target.value)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">워터마크 설정</h3>
        <div className="flex items-center">
          <input
            id="watermark-enabled"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={watermark.enabled}
            onChange={handleEnableChange}
          />
          <label htmlFor="watermark-enabled" className="ml-2 block text-sm text-gray-900">
            활성화
          </label>
        </div>
      </div>
      
      <div className={watermark.enabled ? '' : 'opacity-50 pointer-events-none'}>
        <div className="mb-4">
          <label htmlFor="watermark-text" className="block text-sm font-medium text-gray-700 mb-1">
            워터마크 텍스트
          </label>
          <input
            type="text"
            id="watermark-text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={watermark.text}
            onChange={handleTextChange}
            placeholder="워터마크 텍스트 입력"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            위치
          </label>
          <div className="grid grid-cols-3 gap-2">
            {positions.map((pos) => (
              <button
                key={pos.value}
                className={`py-2 px-3 border rounded text-sm ${
                  watermark.position === pos.value
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onClick={() => handlePositionChange(pos.value as any)}
              >
                {pos.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="watermark-fontsize" className="block text-sm font-medium text-gray-700 mb-1">
              글꼴 크기: {watermark.fontSize}px
            </label>
            <input
              type="range"
              id="watermark-fontsize"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              min="10"
              max="48"
              value={watermark.fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
          
          <div>
            <label htmlFor="watermark-opacity" className="block text-sm font-medium text-gray-700 mb-1">
              투명도: {Math.round(watermark.opacity * 100)}%
            </label>
            <input
              type="range"
              id="watermark-opacity"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              min="0.1"
              max="1"
              step="0.1"
              value={watermark.opacity}
              onChange={handleOpacityChange}
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="watermark-color" className="block text-sm font-medium text-gray-700 mb-1">
            색상
          </label>
          <div className="flex">
            <input
              type="color"
              id="watermark-color"
              className="h-8 w-8 border-0 p-0"
              value={watermark.color}
              onChange={handleColorChange}
            />
            <input
              type="text"
              className="ml-2 flex-1 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={watermark.color}
              onChange={handleColorChange}
            />
          </div>
        </div>
        
        <div className="mt-4 p-3 border rounded-md">
          <h4 className="text-sm font-medium mb-2">미리보기</h4>
          <div className="relative h-20 bg-gray-100 flex items-center justify-center">
            <div 
              className="absolute"
              style={{
                fontSize: `${watermark.fontSize}px`,
                color: watermark.color,
                opacity: watermark.opacity,
                top: watermark.position.includes('top') ? '8px' : 'auto',
                bottom: watermark.position.includes('bottom') ? '8px' : 'auto',
                left: watermark.position.includes('Left') ? '8px' : 'auto',
                right: watermark.position.includes('Right') ? '8px' : 'auto',
                transform: watermark.position === 'center' ? 'translate(-50%, -50%)' : 'none',
                ...(watermark.position === 'center' ? { top: '50%', left: '50%' } : {})
              }}
            >
              {watermark.text || '워터마크 텍스트'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 