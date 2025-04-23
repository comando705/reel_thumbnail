export type MotionType = 
  | 'none'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'zoomIn'
  | 'zoomOut'
  | 'fadeIn'
  | 'fadeOut'
  | 'rotate';

export interface MotionSettings {
  type: MotionType;
  duration: number; // 모션 지속 시간 (밀리초)
  delay: number; // 모션 시작 전 지연 시간 (밀리초)
}

export interface ImageData {
  id: string;
  url: string;
  motion: MotionSettings;
  order: number;
}

export interface WatermarkSettings {
  enabled: boolean;
  text: string;
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'center';
  fontSize: number;
  color: string;
  opacity: number;
} 