export function createImageWithBorder(imgElement: HTMLImageElement, frameSize: number, color: string): string {
    const imgPxWidth = imgElement.naturalWidth;
    const imgPxHeight = imgElement.naturalHeight
    const borderPxSize = frameSize * imgPxHeight / 100;
    // console.log('Img size: ' + imgPxWidth + 'x' + imgPxHeight + ' | Border size: ' + borderPxSize);

    let canvasWidth = imgPxWidth + 2 * borderPxSize;
    let canvasHeight = imgPxHeight + 2 * borderPxSize;

    let img = new Image();
    img.src = imgElement.src;

    let canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, borderPxSize, borderPxSize);

    return canvas.toDataURL('image/jpeg', 0.8);
}