import './Editor.css';
import Canvas, { ReferenceDimension } from '../Canvas/Canvas';
import React, { useEffect, useState } from 'react';
import 'rc-slider/assets/index.css';
import { getDeviceOrientation, Orientation } from '../../modules/display';
import { produceNewImage } from '../Canvas/CanvasProcessing';
import { HexColorPicker } from 'react-colorful';
import initialImage from './../../assets/initial_img.jpeg';
import { SliderWrapper } from '../SliderWrapper/SliderWrapper';
import { MenuHeader, SimpleHeader } from '../Header/Header';
import Sheet from 'react-modal-sheet';
import { Spinner } from '../Spinner/Spinner';


interface EditorProps {

}

interface EditorState {
    selectedFrameSize: number,  // as percentage of canvas height (size)
    selectedColor: string,
    editorOrientation: Orientation,
    imageUrl: string,
    isProcessingImage: boolean,
    colorPickerSheetOpened: boolean
}

function Editor(props: EditorProps) {
    const [editorState, setEditorState] = useState<EditorState>({
        selectedFrameSize: 2,
        selectedColor: '#590de4',
        editorOrientation: getDeviceOrientation(),
        imageUrl: initialImage,
        isProcessingImage: false,
        colorPickerSheetOpened: false
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

    // const onDownload = () => {
    //     let imgUrl: string = produceNewImage();
    //     download(imgUrl, generateFilename('jpeg'));
    // }

    const onDownload = () => {
        setEditorState({ ...editorState, isProcessingImage: true });

        setTimeout(() => {
            setEditorState({ ...editorState, isProcessingImage: false });
        }, 2000);
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

    const setColorPickerSheetOpened = (value: boolean) => {
        if (value && !isOrientationHorizontal())
            setEditorState({ ...editorState, colorPickerSheetOpened: true })
        else if (editorState.colorPickerSheetOpened)
            setEditorState({ ...editorState, colorPickerSheetOpened: false })
    }

    const getColorPicker = () => <HexColorPicker color={editorState.selectedColor} onChange={onColorChange} />;

    return (
        <div className='flex-container' style={getEditorFlexDirection()}>
            <input id='fileinput' type='file' accept='image/jpeg' onChange={onImageChange} />
            {!isOrientationHorizontal() &&
                <MenuHeader
                    inputElementId='fileinput'
                    onDownload={onDownload}
                />
            }
            <div>
                <Canvas
                    referenceDimension={getCanvasReferenceDimension()}
                    borderSize={editorState.selectedFrameSize}
                    borderColor={editorState.selectedColor}
                    imageUrl={editorState.imageUrl}
                />
            </div>
            <div id='editor-params'>
                {isOrientationHorizontal() && <SimpleHeader />}
                <div className='editor-section'>
                    <label>Border size</label>
                    <SliderWrapper
                        min={0}
                        max={1}
                        defaultValue={editorState.selectedFrameSize}
                        onChange={onSliderChange}
                    />
                </div>
                <div className='editor-section'>
                    <label>Color</label>
                    {isOrientationHorizontal() ? getColorPicker() :
                        <span className='circle' onClick={() => setColorPickerSheetOpened(true)} style={{ background: editorState.selectedColor }} />
                        // <button onClick={() => setColorPickerSheetOpened(true)}>Select</button>
                    }
                </div>
                {isOrientationHorizontal() &&
                    <div className='editor-section editor-buttons'>
                        <label htmlFor='fileinput' className="button-outline full-available-width">Change image</label>
                        <button onClick={onDownload} className='button-solid full-available-width' disabled={editorState.isProcessingImage}>
                            {!editorState.isProcessingImage ? "Download" : <Spinner />}
                        </button>
                    </div>
                }
                <div className='editor-section'>
                    <Sheet
                        isOpen={editorState.colorPickerSheetOpened}
                        onClose={() => setColorPickerSheetOpened(false)}
                        disableDrag={true}
                        snapPoints={[0.5]}>
                        {/* @ts-ignore */}
                        <Sheet.Container>
                            {/* @ts-ignore */}
                            <Sheet.Content>
                                <div id='color-picker-sheet'>
                                    <div id='picker-header'>
                                        {/* <span>Cancel</span> */}
                                        <span className='flex-big' />
                                        <span className='button-text' onClick={() => setColorPickerSheetOpened(false)}>OK</span>
                                    </div>
                                    <div className='responsive-picker'>
                                        {getColorPicker()}
                                    </div>
                                </div>
                            </Sheet.Content>
                        </Sheet.Container>

                        {/* @ts-ignore */}
                        <Sheet.Backdrop />
                    </Sheet>
                </div>
            </div>
        </div>
    );
}

function download(url: string, filename: string) {
    const link: HTMLAnchorElement = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
}

function generateFilename(extension: string): string {
    return Date.now().toString() + '.' + extension;
}

export default Editor;