// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

interface CanvasProps {
  width: number;
  height: number;
  backgroundColor?: string;
  imageUrl?: string | null;
}

function Canvas({ width, height, backgroundColor = '#ffffff', imageUrl }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<any>(null);
  const [isCanvasReady, setIsCanvasReady] = useState(false);

  // Canvas 초기화
  useEffect(() => {
    let canvas: any = null;
    
    const initCanvas = async () => {
      if (!canvasRef.current || fabricCanvas) return;

      try {
        // 기존 canvas가 있다면 제거
        if (fabricCanvas) {
          fabricCanvas.dispose();
        }

        // 새로운 canvas 생성
        canvas = new fabric.Canvas(canvasRef.current, {
          width,
          height,
          backgroundColor,
          preserveObjectStacking: true,
        });

        // canvas가 준비될 때까지 대기
        await new Promise(resolve => setTimeout(resolve, 100));

        setFabricCanvas(canvas);
        setIsCanvasReady(true);
      } catch (error) {
        console.error('Canvas 초기화 실패:', error);
      }
    };

    initCanvas();

    return () => {
      if (canvas) {
        canvas.dispose();
      }
      setFabricCanvas(null);
      setIsCanvasReady(false);
    };
  }, [width, height, backgroundColor]);

  // 이미지 로딩
  useEffect(() => {
    if (!isCanvasReady || !fabricCanvas || !imageUrl) {
      console.log('Canvas 또는 imageUrl이 없음:', { isCanvasReady, fabricCanvas, imageUrl });
      return;
    }

    const loadImage = async () => {
      try {
        console.log('이미지 로딩 시작:', imageUrl);
        
        // 기존 객체들을 모두 제거
        fabricCanvas.clear();

        await new Promise((resolve, reject) => {
          fabric.Image.fromURL(imageUrl, (img) => {
            if (!fabricCanvas) {
              reject(new Error('Canvas가 유실됨'));
              return;
            }

            try {
              console.log('이미지 로드 완료:', img);
              
              // 이미지 크기를 Canvas에 맞게 조절
              const scale = Math.min(
                (width * 0.8) / img.width,
                (height * 0.8) / img.height
              );
              console.log('이미지 스케일 계산:', { scale, imgWidth: img.width, imgHeight: img.height });

              img.scale(scale);

              // 이미지를 Canvas 중앙에 배치
              const left = (width - img.width * scale) / 2;
              const top = (height - img.height * scale) / 2;
              console.log('이미지 위치 계산:', { left, top });

              img.set({
                left,
                top,
              });

              fabricCanvas.add(img);
              fabricCanvas.renderAll();
              console.log('이미지 추가 완료');
              resolve(true);
            } catch (error) {
              reject(error);
            }
          }, (error) => {
            reject(error);
          });
        });
      } catch (error) {
        console.error('이미지 처리 중 에러 발생:', error);
      }
    };

    loadImage();
  }, [fabricCanvas, imageUrl, width, height, isCanvasReady]);

  const addImage = async (url: string) => {
    if (!fabricCanvas) return;

    const img = new fabric.Image(url, {
      left: 0,
      top: 0,
      scaleX: width / fabric.util.getByKey(fabric.Image.fromURL(url)).width!,
      scaleY: height / fabric.util.getByKey(fabric.Image.fromURL(url)).height!,
    });
    fabricCanvas.add(img);
    fabricCanvas.renderAll();
  };

  const addText = async (text: string) => {
    if (!fabricCanvas) return;

    const fabricText = new fabric.Text(text, {
      left: width / 2,
      top: height / 2,
      fontSize: 20,
      fill: '#000000',
    });
    fabricCanvas.add(fabricText);
    fabricCanvas.renderAll();
  };

  const applyMotion = (option: MotionOption) => {
    if (!fabricCanvas) return;

    const objects = fabricCanvas.getObjects();
    objects.forEach((obj: any) => {
      if (obj instanceof fabric.Image || obj instanceof fabric.Text) {
        switch (option) {
          case 'fade':
            obj.set({ opacity: 0 });
            break;
          case 'slide':
            obj.set({ left: -width });
            break;
          case 'zoom':
            obj.set({ scaleX: 0, scaleY: 0 });
            break;
          default:
            obj.set({ opacity: 1, left: width / 2, scaleX: 1, scaleY: 1 });
        }
      }
    });
    fabricCanvas.renderAll();
  };

  const exportAsImage = () => {
    if (!fabricCanvas) return '';
    return fabricCanvas.toDataURL({ format: 'png', quality: 1 });
  };

  const motionProps: HTMLMotionProps<"div"> = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div {...motionProps}>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
    </motion.div>
  );
}

export default Canvas; 