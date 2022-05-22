import Canvas from '../Canvas/Canvas';
import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


interface EditorProps {

}

interface EditorState {
    borderSize: number,  // as percentage of canvas height
    borderColor: number
}

function Editor(props: EditorProps) {
    const [editorData, setEditorData] = useState<EditorState>({
        borderSize: 0,
        borderColor: 0xff8c00
    });

    const onSliderChange = (value: number | number[]) => {
        // console.log('Slider value: ' + value);
        setEditorData({...editorData, borderSize: value as number});
    }

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
                viewportHeightToWidthPercentage={50} 
                borderSize={editorData.borderSize} 
                borderColor={editorData.borderColor} 
            />
        </div>
    );
}

export default Editor;