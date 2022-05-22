import './Canvas.css';
import horizontalSample from "./../../assets/horizontal_sample.jpeg"

interface CanvasProps {
    borderWidth: number;
    borderColor: number;
}

function Canvas(props: CanvasProps) {
    return (
        <div id="canvas">
            <img 
                src={horizontalSample} 
                alt=""
                style={getImageStyle(props)} 
            />
        </div>
    );
}

function getImageStyle(props:  CanvasProps) {
    return {
        borderStyle: 'solid',
        borderWidth: getBorderWidthValue(props.borderWidth),
        borderColor: getBorderColorValue(props.borderColor)
    };
}

function getBorderWidthValue(value: number) {
    return (value * 0.1).toString() + 'vw';
}

function getBorderColorValue(numericColor: number) {
    return '#' + numericColor.toString(16);
}

export default Canvas;