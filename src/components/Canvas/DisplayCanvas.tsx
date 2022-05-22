import { formatAsPercentage, formatAsVw } from "../../modules/formattingUtils";

interface DisplayCanvasProps {
    id: string,
    viewportHeightToWidthPercentage: number,
    borderSize: number,
    borderColor: string,
    imageUrl: string
}

function DisplayCanvas(props: DisplayCanvasProps) {
    return (
        <div id={props.id} style={getDisplayCanvasStyle(props)}>
            <img
                src={props.imageUrl}
                alt=""
                style={getImageStyle(props)}
            />
        </div>
    );
}

function getDisplayCanvasStyle(props: DisplayCanvasProps) {
    return {
        height: formatAsVw(props.viewportHeightToWidthPercentage),
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
}

function getImageStyle(props: DisplayCanvasProps) {
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

function calculateImageMaxHeightPercentage(props: DisplayCanvasProps): number {
    return 100 - (props.borderSize * 2);
}

function calculateBorderSize(props: DisplayCanvasProps): number {
    return props.borderSize / 100 * props.viewportHeightToWidthPercentage;
}

export default DisplayCanvas;