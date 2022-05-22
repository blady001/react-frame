import { formatAsPercentage, formatAsVw } from "../../modules/formattingUtils";
import horizontalSample from "./../../assets/vertical_sample.jpeg"

interface CanvasProps {
    id: string;
    viewportHeightToWidthPercentage: number;
    borderSize: number;
    borderColor: string;
}

function Canvas(props: CanvasProps) {
    return (
        <div id={props.id} style={getCanvasStyle(props)}>
            <img 
                src={horizontalSample} 
                alt=""
                style={getImageStyle(props)} 
            />
        </div>
    );
}

function getCanvasStyle(props: CanvasProps) {
    return {
        height: formatAsVw(props.viewportHeightToWidthPercentage),
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
}

function getImageStyle(props:  CanvasProps) {
    let imageMaxSize = calculateImageMaxHeightPercentage(props);
    let borderSize = calculateBorderSize(props);
    // console.log("Border size: " + borderSize.toString() + '%');
    return {
        maxWidth: formatAsPercentage(imageMaxSize),
        maxHeight: formatAsPercentage(imageMaxSize),
        borderStyle: 'solid',
        borderWidth: formatAsVw(borderSize),
        borderColor: props.borderColor
    };
}

function calculateImageMaxHeightPercentage(props: CanvasProps): number {
    return 100 - (props.borderSize * 2);
}

function calculateBorderSize(props: CanvasProps): number {
    return props.borderSize / 100 * props.viewportHeightToWidthPercentage;
}

export default Canvas;