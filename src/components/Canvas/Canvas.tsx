import './Canvas.css';
import { format } from "../../modules/formattingUtils";

export const CANVAS_IMG_ELEMENT_ID = 'canvas-img';

export enum ReferenceDimension {
    Width = 'vw',
    Height = 'vh'
}

const SCALE = 0.9;

interface CanvasProps {
    referenceDimension: ReferenceDimension,
    borderSize: number,
    borderColor: string,
    imageUrl: string
}

function Canvas(props: CanvasProps) {

    const getCanvasSize = () => ({
        height: format(100, props.referenceDimension),
        width: format(100, props.referenceDimension),
    });

    const getRenderingSquareSize = () => ({
        height: format(SCALE * 100, props.referenceDimension),
        width: format(SCALE * 100, props.referenceDimension),
    });

    const getImgStyle = () => {
        let imageMaxSize = calculateImageMaxHeightPercentage(props);
        let borderSize = calculateBorderSize(props);
        // console.log("Border size: " + borderSize.toString() + '%');
        return {
            maxWidth: format(imageMaxSize, '%'),
            maxHeight: format(imageMaxSize, '%'),
            borderStyle: 'solid',
            borderWidth: format(borderSize, props.referenceDimension),
            borderColor: props.borderColor
        };
    };

    return (
        <div id='main-canvas' style={getCanvasSize()}>
            <div id='rendering-square' style={getRenderingSquareSize()}>
                <img
                    id={CANVAS_IMG_ELEMENT_ID}
                    src={props.imageUrl}
                    alt=""
                    style={getImgStyle()}
                />
            </div>
        </div>
    );
}

function calculateImageMaxHeightPercentage(props: CanvasProps): number {
    return 100 - (props.borderSize * 2);
}

function calculateBorderSize(props: CanvasProps): number {
    return props.borderSize * SCALE;
}


export default Canvas;