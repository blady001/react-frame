export function createImageWithBorder(frameSize: number, frameColor: string): string {
    const canvasElement = document.getElementById('display-canvas') as HTMLElement;
    const imgElement = document.getElementById('display-canvas-img') as HTMLImageElement;

    const referenceSize = canvasElement.scrollHeight;
    const imgHeightScaled = imgElement.height;
    const imgWidthScaled = imgElement.width;
    const imgHeightPx = imgElement.naturalHeight;
    const imgWidthPx = imgElement.naturalWidth;
    const borderPxScaled = frameSize * referenceSize / 100;
    const borderPx = Math.max(imgHeightPx, imgWidthPx) * borderPxScaled / Math.max(imgHeightScaled, imgWidthScaled);

    // console.log('Img size: ' + imgWidthPx + 'x' + imgHeightPx + ' | Border size: ' + borderPx);

    let canvasWidth = imgWidthPx + 2 * borderPx;
    let canvasHeight = imgHeightPx + 2 * borderPx;

    let img = new Image();
    img.src = imgElement.src;

    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let ctx = canvas.getContext('2d')!;
    ctx.fillStyle = frameColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, borderPx, borderPx);

    return canvas.toDataURL('image/jpeg', 0.8);
}