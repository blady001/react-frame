import './Editor.css';
import Canvas, { ReferenceDimension } from '../Canvas/Canvas';
import React, { useEffect, useState } from 'react';
import 'rc-slider/assets/index.css';
import { getDeviceOrientation, Orientation } from '../../modules/display';
import { produceNewImage } from '../Canvas/CanvasProcessing';
import { HexColorPicker } from 'react-colorful';
import initialImage from './../../assets/initial_img.jpeg';
import { SliderWrapper } from '../SliderWrapper/SliderWrapper';


interface EditorProps {

}

interface EditorState {
    selectedFrameSize: number,  // as percentage of canvas height (size)
    selectedColor: string,
    editorOrientation: Orientation,
    imageUrl: string
}

function Editor(props: EditorProps) {
    const [editorState, setEditorState] = useState<EditorState>({
        selectedFrameSize: 2,
        // selectedColor: 'rgb(89, 13, 228)',
        selectedColor: 'var(--primary-color)',
        editorOrientation: getDeviceOrientation(),
        imageUrl: initialImage
    });

    const onSliderChange = (value: number | number[]) => {
        // console.log('Slider value: ' + value);
        setEditorState({ ...editorState, selectedFrameSize: value as number });
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
        let imgUrl: string = produceNewImage();
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

    const getCanvasReferenceDimension = () => isOrientationHorizontal() ? ReferenceDimension.Height : ReferenceDimension.Width;

    const getEditorFlexDirection = () => {
        if (isOrientationHorizontal()) {
            return { flexDirection: 'row' as 'row' };
        } else {
            return { flexDirection: 'column' as 'column' };
        }
    }

    return (
        <div className='flex-container' style={getEditorFlexDirection()}>
            {!isOrientationHorizontal() ? <h1 id='title' style={{textAlign: 'center'}}>FrameTool</h1> : null}
            <div>
                <Canvas
                    referenceDimension={getCanvasReferenceDimension()}
                    borderSize={editorState.selectedFrameSize}
                    borderColor={editorState.selectedColor}
                    imageUrl={editorState.imageUrl}
                />
            </div>
            <div id='editor-params'>
                {isOrientationHorizontal() ? <h1 id='title'>FrameTool</h1> : null}
                {/* <input type='file' accept="image/jpeg" onChange={onImageChange} /> */}
                <div>
                    <label htmlFor='fileinput' className="btn">Select image</label>
                    <input id="fileinput" type="file" accept="image/jpeg" onChange={onImageChange} />
                </div>
                <HexColorPicker color={editorState.selectedColor} onChange={onColorChange} />
                <div>
                    <label>Border size</label>
                    <SliderWrapper
                        min={0}
                        max={1}
                        defaultValue={editorState.selectedFrameSize}
                        onChange={onSliderChange}
                    />
                </div>
                <div>
                    <button onClick={onDownload}>Download</button>
                </div>
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