'use client';

import { useState } from 'react';

interface TextEditorProps {
  onAddText?: (text: string, options: TextOptions) => void;
}

interface TextOptions {
  fontSize: number;
  color: string;
}

export const TextEditor = ({ onAddText }: TextEditorProps) => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(20);
  const [color, setColor] = useState('#000000');

  const handleAddText = () => {
    if (onAddText) {
      onAddText(text, { fontSize, color });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="텍스트를 입력하세요"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            글자 크기
          </label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="mt-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="12"
            max="72"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            색상
          </label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="mt-1 p-1 border rounded"
          />
        </div>
      </div>

      <button
        onClick={handleAddText}
        className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        텍스트 추가
      </button>
    </div>
  );
}; 