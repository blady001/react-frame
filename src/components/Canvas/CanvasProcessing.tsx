import { CANVAS_IMG_ELEMENT_ID } from "./Canvas";

export function produceNewImage(): string {
    const imgElement = document.getElementById(CANVAS_IMG_ELEMENT_ID) as HTMLImageElement;
    const imgComputedStyle = getComputedStyle(imgElement);

    const imgVisibleHeight = parseFloat(imgComputedStyle.height);
    const imgVisibleWidth = parseFloat(imgComputedStyle.width);
    const imgRealHeight = imgElement.naturalHeight;
    const imgRealWidth = imgElement.naturalWidth;

    const borderVisibleSize = parseFloat(imgComputedStyle.borderWidth);
    const borderRealSize = Math.max(imgRealHeight, imgRealWidth) * borderVisibleSize / Math.max(imgVisibleHeight, imgVisibleWidth);

    let canvasWidth = imgRealWidth + 2 * borderRealSize;
    let canvasHeight = imgRealHeight + 2 * borderRealSize;

    let img = new Image();
    img.src = imgElement.src;

    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let ctx = canvas.getContext('2d')!;
    ctx.fillStyle = imgComputedStyle.borderColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, borderRealSize, borderRealSize);

    return canvas.toDataURL('image/jpeg', 0.8);
}