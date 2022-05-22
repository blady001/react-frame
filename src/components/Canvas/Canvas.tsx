import horizontalSample from "./../../assets/horizontal_sample.jpeg"

interface CanvasProps {
    id: string;
    viewportHeight: number;
    borderWidth: number;
    borderColor: number;
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
        height: props.viewportHeight.toString() + 'vw',
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };
}

function getImageStyle(props:  CanvasProps) {
    return {
        maxWidth: '100%',
        maxHeight: '100%'
    };
    // return {
    //     borderStyle: 'solid',
    //     borderWidth: getBorderWidthValue(props.borderWidth),
    //     borderColor: getBorderColorValue(props.borderColor)
    // };
}

function getBorderWidthValue(value: number) {
    return (value * 0.1).toString() + 'vw';
}

function getBorderColorValue(numericColor: number) {
    return '#' + numericColor.toString(16);
}

export default Canvas;