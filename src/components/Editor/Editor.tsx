import './Editor.css';
import Canvas from '../Canvas/Canvas';
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getDeviceOrientation, Orientation } from '../../modules/display';
import ColorPicker from '../ColorPicker/ColorPicker';


interface EditorProps {

}

interface EditorState {
    selectedFrameSize: number,  // as percentage of canvas height (size)
    selectedColor: string,
    editorOrientation: Orientation,
    showColorPicker: boolean
}

function Editor(props: EditorProps) {
    const [editorData, setEditorData] = useState<EditorState>({
        selectedFrameSize: 0,
        selectedColor: '#ff8c00',
        editorOrientation: getDeviceOrientation(),
        showColorPicker: false
    });

    const onSliderChange = (value: number | number[]) => {
        // console.log('Slider value: ' + value);
        setEditorData({ ...editorData, selectedFrameSize: value as number });
    };

    const toggleColorPicker = () => {
        setEditorData({ ...editorData, showColorPicker: !editorData.showColorPicker });
    };

    const onColorChange = (value: string) => {
        setEditorData({ ...editorData, selectedColor: value })
    };

    // @ts-ignore
    useEffect(() => {
        const resizeHandler = () => {
            let currentOrientation = getDeviceOrientation();
            // console.log(currentOrientation);
            if (currentOrientation !== editorData.editorOrientation) {
                setEditorData({ ...editorData, editorOrientation: currentOrientation })
            }
        };

        window.addEventListener('resize', resizeHandler);

        return (_: any) => {
            window.removeEventListener('resize', resizeHandler);
        };
    });

    return (
        <div id='editor'>
            <Canvas
                id='canvas'
                viewportHeightToWidthPercentage={getCanvasSize(editorData.editorOrientation)}
                borderSize={editorData.selectedFrameSize}
                borderColor={editorData.selectedColor}
            />
            <Slider
                min={0}
                max={10}
                defaultValue={editorData.selectedFrameSize}
                onChange={onSliderChange}
                style={{ maxWidth: '50vw', margin: '0 auto' }}
            />
            <button onClick={toggleColorPicker}>Color</button>
            {editorData.showColorPicker ?
                <ColorPicker
                    color={editorData.selectedColor}
                    onDismiss={toggleColorPicker}
                    onColorChange={onColorChange}
                />
                : null}
        </div>
    );
}

function getCanvasSize(orientation: Orientation): number {
    return orientation === Orientation.Horizontal ? 50 : 80;
}

export default Editor;