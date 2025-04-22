declare module 'fabric' {
  interface ICanvasOptions {
    width?: number;
    height?: number;
    backgroundColor?: string;
  }

  interface IImageOptions {
    left?: number;
    top?: number;
    scaleX?: number;
    scaleY?: number;
    angle?: number;
    opacity?: number;
    width?: number;
    height?: number;
  }

  interface ITextOptions {
    left?: number;
    top?: number;
    fontSize?: number;
    fontFamily?: string;
    fill?: string;
    text?: string;
  }

  class Canvas {
    constructor(element: HTMLCanvasElement | string, options?: ICanvasOptions);
    add(object: Image | Text): void;
    renderAll(): void;
    clear(): void;
    dispose(): void;
    getObjects(): (Image | Text)[];
    toDataURL(options?: { format?: string; quality?: number }): string;
  }

  class Image {
    static fromURL(url: string, callback: (img: Image) => void): void;
    constructor(element: HTMLImageElement | string, options?: IImageOptions);
    scale(value: number): void;
    set(key: string | object, value?: any): void;
    width?: number;
    height?: number;
  }

  class Text {
    constructor(text: string, options?: ITextOptions);
    set(key: string | object, value?: any): void;
  }

  const fabric: {
    Canvas: typeof Canvas;
    Image: typeof Image;
    Text: typeof Text;
  };

  export default fabric;
} 