declare module 'fabric' {
  interface IObjectOptions {
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    scaleX?: number;
    scaleY?: number;
    opacity?: number;
    angle?: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    selectable?: boolean;
    hasControls?: boolean;
    hasBorders?: boolean;
    lockMovementX?: boolean;
    lockMovementY?: boolean;
    hoverCursor?: string;
  }

  interface IImageOptions extends IObjectOptions {
    src?: string;
    filters?: any[];
    crossOrigin?: string;
  }

  interface ITextOptions extends IObjectOptions {
    text?: string;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textAlign?: string;
    lineHeight?: number;
    charSpacing?: number;
    underline?: boolean;
    textBackgroundColor?: string;
  }

  interface ICanvasOptions {
    width: number;
    height: number;
    backgroundColor?: string;
    preserveObjectStacking?: boolean;
    selection?: boolean;
    renderOnAddRemove?: boolean;
    controlsAboveOverlay?: boolean;
  }

  interface IAnimation {
    onChange?: (value: number) => void;
    onComplete?: () => void;
    duration?: number;
    easing?: (t: number) => number;
    startValue?: number;
    endValue?: number;
  }

  class Canvas {
    constructor(element: HTMLCanvasElement | string, options: ICanvasOptions);
    add(...objects: any[]): Canvas;
    remove(...objects: any[]): Canvas;
    clear(): Canvas;
    renderAll(): void;
    setBackgroundColor(color: string, callback?: Function): Canvas;
    setWidth(width: number): Canvas;
    setHeight(height: number): Canvas;
    getObjects(): any[];
    discardActiveObject(): Canvas;
    dispose(): void;
    toDataURL(options?: any): string;
    getContext(): CanvasRenderingContext2D;
    getElement(): HTMLCanvasElement;
    getActiveObject(): any;
    getActiveObjects(): any[];
    item(index: number): any;
    forEachObject(callback: (obj: any, index: number, array: any[]) => void): Canvas;
    requestRenderAll(): void;
  }

  class Image {
    static fromURL(url: string, callback: (image: Image) => void, options?: any): void;
    constructor(element: HTMLImageElement | string, options?: IImageOptions);
    set(options: IImageOptions): Image;
    scale(value: number): Image;
    animate(property: string, value: number | string, options?: IAnimation): Canvas;
    getSrc(): string;
    getElement(): HTMLImageElement;
    setElement(element: HTMLImageElement): Image;
    crossOrigin: string;
    width: number;
    height: number;
  }

  class Text {
    constructor(text: string, options?: ITextOptions);
    setText(text: string): Text;
    set(options: ITextOptions): Text;
    animate(property: string, value: number | string, options?: IAnimation): Canvas;
    getStyleAtPosition(position: number): any;
    setColor(color: string): Text;
    setFontSize(fontSize: number): Text;
    setFontFamily(fontFamily: string): Text;
    setTextAlign(textAlign: string): Text;
    getTextWidth(): number;
    getTextHeight(): number;
  }

  class Textbox extends Text {
    constructor(text: string, options?: ITextOptions);
    setTextAlign(textAlign: string): Textbox;
  }

  class Group {
    constructor(objects: any[], options?: IObjectOptions);
    addWithUpdate(object: any): Group;
    removeWithUpdate(object: any): Group;
    set(options: IObjectOptions): Group;
    getObjects(): any[];
    item(index: number): any;
    animate(property: string, value: number | string, options?: IAnimation): Canvas;
  }

  class ActiveSelection extends Group {
    constructor(objects: any[], options?: IObjectOptions);
  }

  const util: {
    addClass(element: HTMLElement, className: string): void;
    removeClass(element: HTMLElement, className: string): void;
    getById(id: string): HTMLElement;
    toArray(arrayLike: any): any[];
    requestAnimFrame(callback: Function, element?: HTMLElement): number;
    getPointer(event: Event, upperCanvasEl?: HTMLCanvasElement): { x: number; y: number };
    degreesToRadians(degrees: number): number;
    radiansToDegrees(radians: number): number;
  }

  class Object {
    set(options: IObjectOptions): Object;
    animate(property: string, value: number | string, options?: IAnimation): Canvas;
    clone(callback?: (obj: Object) => void): Object;
    remove(): void;
    setCoords(): Object;
    setOptions(options: IObjectOptions): Object;
    hasStateChanged(): boolean;
  }

  const Point: {
    new(x: number, y: number): { x: number; y: number };
  }
}

export {}; 