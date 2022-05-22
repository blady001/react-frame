import Canvas from '../Canvas/Canvas';
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getDeviceOrientation, Orientation } from '../../modules/display';


interface EditorProps {

}

interface EditorState {
    borderSize: number,  // as percentage of canvas height (size)
    borderColor: number,
    editorOrientation: Orientation
}

function Editor(props: EditorProps) {
    const [editorData, setEditorData] = useState<EditorState>({
        borderSize: 0,
        borderColor: 0xff8c00,
        editorOrientation: getDeviceOrientation()
    });

    const onSliderChange = (value: number | number[]) => {
        // console.log('Slider value: ' + value);
        setEditorData({...editorData, borderSize: value as number});
    }

    // @ts-ignore
    useEffect(() => {
        const resizeHandler = () => {
            let currentOrientation = getDeviceOrientation();
            console.log(currentOrientation);
            if (currentOrientation !== editorData.editorOrientation) {
                setEditorData({...editorData, editorOrientation: currentOrientation})
            }
        };

        window.addEventListener('resize', resizeHandler);
        
        return (_: any) => {
            window.removeEventListener('resize', resizeHandler);
        };
    });

    return (
        <div id='editor'>
            <Slider 
                min={0}
                max={10}
                defaultValue={editorData.borderSize}
                onChange={onSliderChange}
                style={{maxWidth: '50vw', margin: '0 auto'}}
            />
            <Canvas 
                id='canvas' 
                viewportHeightToWidthPercentage={getCanvasSize(editorData.editorOrientation)} 
                borderSize={editorData.borderSize} 
                borderColor={editorData.borderColor} 
            />
        </div>
    );
}

function getCanvasSize(orientation: Orientation): number {
    return orientation === Orientation.Horizontal ? 50 : 80;
}

export default Editor;