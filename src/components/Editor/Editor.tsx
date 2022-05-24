import './Editor.css';
import DisplayCanvas from '../Canvas/DisplayCanvas';
import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getDeviceOrientation, Orientation } from '../../modules/display';
import ColorPicker from '../ColorPicker/ColorPicker';
import { createImageWithBorder } from '../../modules/imageManipulation';


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

    const onDownload = () => {
        let imgUrl: string = createImageWithBorder();
        download(imgUrl, generateFilename('jpeg'));
    }

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

    const isOrientationHorizontal = () => editorState.editorOrientation === Orientation.Horizontal;

    const getUnit = () => isOrientationHorizontal() ? 'vh' : 'vw';

    const getEditorFlexDirection = () => {
        if (isOrientationHorizontal()) {
            return { flexDirection: 'row' as 'row' };
        } else {
            return { flexDirection: 'column' as 'column' };
        } 
    }

    return (
        <div className='container' style={getEditorFlexDirection()}>
            <div>
                {editorState.imageUrl === undefined ? null :
                    <DisplayCanvas
                        resizeReferenceUnit={getUnit()}
                        scale={0.8}
                        borderSize={editorState.selectedFrameSize}
                        borderColor={editorState.selectedColor}
                        imageUrl={editorState.imageUrl}
                    />
                }
            </div>
            <div>
                <input type='file' onChange={onImageChange} />
                <Slider
                    min={0}
                    max={10}
                    defaultValue={editorState.selectedFrameSize}
                    onChange={onSliderChange}
                    style={{ maxWidth: '50vw', margin: '0 auto' }}
                />
                <button onClick={toggleColorPicker}>Color</button>
                <button onClick={onDownload}>Download</button>
                {editorState.showColorPicker ?
                    <ColorPicker
                        color={editorState.selectedColor}
                        onDismiss={toggleColorPicker}
                        onColorChange={onColorChange}
                    />
                    : null}
            </div>
        </div>
    );
}

function download(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
}

function generateFilename(extension: string): string {
    return Date.now().toString() + '.' + extension;
}

export default Editor;