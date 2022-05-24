import { format } from "../../modules/formattingUtils";

export const CANVAS_IMG_ELEMENT_ID = 'canvas-img';

export enum ReferenceDimension {
    Width = 'vw',
    Height = 'vh'
}

const SCALE = 0.8;  // TODO: Make it auto calculated on the basis of the image size (smaller the image, lesser the scale multiplier)

interface CanvasProps {
    referenceDimension: ReferenceDimension,
    borderSize: number,
    borderColor: string,
    imageUrl?: string
}

function Canvas(props: CanvasProps) {

    const getCanvasStyle = () => ({
        display: 'flex',
        justifyContent: 'center',
        'alignItems': 'center',
        height: format(100, props.referenceDimension),
        width: format(100, props.referenceDimension),
        backgroundColor: 'lightGray'
    });

    const getRenderingSquareStyle = () => ({
            height: format(SCALE * 100, props.referenceDimension),
            width: format(SCALE * 100, props.referenceDimension),
            backgroundColor: 'grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
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

    // TODO: START WITH displaying image conditionally
    // TODO: then nice button for download (which prevents double clicking and shows loading)
    // TODO: Then styling
    return (
        <div style={getCanvasStyle()}>
            <div style={getRenderingSquareStyle()}>
                {/* { props.imageUrl ?? */} 
                    <img
                        id={CANVAS_IMG_ELEMENT_ID}
                        src={props.imageUrl}
                        alt=""
                        style={getImgStyle()}
                    />
                {/* } */}
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