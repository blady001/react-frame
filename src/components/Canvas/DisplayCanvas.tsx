import { format } from "../../modules/formattingUtils";

interface DisplayCanvasProps {
    resizeReferenceUnit: string,
    scale: number,
    borderSize: number,
    borderColor: string,
    imageUrl?: string
}

function DisplayCanvas(props: DisplayCanvasProps) {

    const getWrapperStyle = () => ({
        display: 'flex',
        justifyContent: 'center',
        'alignItems': 'center',
        height: format(100, props.resizeReferenceUnit),
        width: format(100, props.resizeReferenceUnit),
        backgroundColor: 'lightGray'
    });

    const getDisplayCanvasStyle = () => ({
            height: format(props.scale * 100, props.resizeReferenceUnit),
            width: format(props.scale * 100, props.resizeReferenceUnit),
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
            borderWidth: format(borderSize, props.resizeReferenceUnit),
            borderColor: props.borderColor
        };
    };

    // TODO: START WITH displaying image conditionally
    // TODO: then nice button for download (which prevents double clicking and shows loading)
    // TODO: Then styling
    return (
        <div style={getWrapperStyle()}>
            <div id='display-canvas' style={getDisplayCanvasStyle()}>
                {/* { props.imageUrl ?? */} 
                    <img
                        id='display-canvas-img'
                        src={props.imageUrl}
                        alt=""
                        style={getImgStyle()}
                    />
                {/* } */}
            </div>
        </div>
    );
}

// function getCanvasWrapperStyle(props: DisplayCanvasProps) {
//     return {
//         display: 'flex',
//         justifyContent: 'center',
//         'alignItems': 'center',
//         height: '100vh',
//         width: '100vh',
//         backgroundColor: 'lightGray'
//     }
// }

// function getDisplayCanvasStyle(props: DisplayCanvasProps) {
//     // return {
//     //     height: formatAsVw(props.viewportHeightToWidthPercentage),
//     //     backgroundColor: 'grey',
//     //     display: 'flex',
//     //     justifyContent: 'center',
//     //     alignItems: 'center'
//     // };
//     return {
//         height: format(props.scale * 100, 'vh'),
//         width: format(props.scale * 100, 'vh'),
//         backgroundColor: 'grey',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     };
// }

// function getImageStyle(props: DisplayCanvasProps) {
//     let imageMaxSize = calculateImageMaxHeightPercentage(props);
//     let borderSize = calculateBorderSize(props);
//     // console.log("Border size: " + borderSize.toString() + '%');
//     return {
//         maxWidth: format(imageMaxSize, '%'),
//         maxHeight: format(imageMaxSize, '%'),
//         borderStyle: 'solid',
//         borderWidth: format(borderSize, 'vh'),
//         borderColor: props.borderColor
//     };
// }

function calculateImageMaxHeightPercentage(props: DisplayCanvasProps): number {
    return 100 - (props.borderSize * 2);
}

// function calculateBorderSize(props: DisplayCanvasProps): number {
//     return props.borderSize / 100 * props.viewportHeightToWidthPercentage;
// }
function calculateBorderSize(props: DisplayCanvasProps): number {
    return props.borderSize * props.scale;
}


export default DisplayCanvas;