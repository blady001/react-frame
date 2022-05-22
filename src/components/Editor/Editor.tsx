import './Editor.css';
import DisplayCanvas from '../Canvas/DisplayCanvas';
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
    showColorPicker: boolean,
    imageUrl?: string
}

function Editor(props: EditorProps) {
    const [editorState, setEditorState] = useState<EditorState>({
        selectedFrameSize: 0,
        selectedColor: '#ff8c00',
        editorOrientation: getDeviceOrientation(),
        showColorPicker: false,
    });

    const onSliderChange = (value: number | number[]) => {
        // console.log('Slider value: ' + value);
        setEditorState({ ...editorState, selectedFrameSize: value as number });
    };

    const toggleColorPicker = () => {
        setEditorState({ ...editorState, showColorPicker: !editorState.showColorPicker });
    };

    const onColorChange = (value: string) => {
        setEditorState({ ...editorState, selectedColor: value })
    };

    const onImageChange = (value: any) => {
        const [file] = value.target.files;
        const imageUrl = URL.createObjectURL(file);
        setEditorState({ ...editorState, imageUrl: imageUrl });
    };

    // @ts-ignore
    useEffect(() => {
        const resizeHandler = () => {
            let currentOrientation = getDeviceOrientation();
            // console.log(currentOrientation);
            if (currentOrientation !== editorState.editorOrientation) {
                setEditorState({ ...editorState, editorOrientation: currentOrientation })
            }
        };

        window.addEventListener('resize', resizeHandler);

        return (_: any) => {
            window.removeEventListener('resize', resizeHandler);
        };
    });

    return (
        <div id='editor'>
            {editorState.imageUrl === undefined ? null :
                <DisplayCanvas
                    id='display-canvas'
                    viewportHeightToWidthPercentage={getDisplayCanvasSize(editorState.editorOrientation)}
                    borderSize={editorState.selectedFrameSize}
                    borderColor={editorState.selectedColor}
                    imageUrl={editorState.imageUrl}
                />
            }
            <input type='file' onChange={onImageChange} />
            <Slider
                min={0}
                max={10}
                defaultValue={editorState.selectedFrameSize}
                onChange={onSliderChange}
                style={{ maxWidth: '50vw', margin: '0 auto' }}
            />
            <button onClick={toggleColorPicker}>Color</button>
            {editorState.showColorPicker ?
                <ColorPicker
                    color={editorState.selectedColor}
                    onDismiss={toggleColorPicker}
                    onColorChange={onColorChange}
                />
                : null}
        </div>
    );
}

function getDisplayCanvasSize(orientation: Orientation): number {
    return orientation === Orientation.Horizontal ? 50 : 80;
}

export default Editor;