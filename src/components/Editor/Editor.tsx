import './Editor.css'
import Canvas from '../Canvas/Canvas';
import React, { useState } from 'react';

interface EditorProps {

}

interface EditorState {
    borderWidth: number,
    borderColor: number
}

function Editor(props: EditorProps) {
    const [editorData, setEditorData] = useState<EditorState>({
        borderWidth: 10,
        borderColor: 0xff8c00
    });

    const onBorderWidthChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log('VALUE: ' + e.currentTarget.value.toString());
        // TODO: fix it
        let width: number = e.currentTarget.value === undefined ? 0 : parseInt(e.currentTarget.value);
        setEditorData({...editorData, borderWidth: width});
    }

    return (
        <>
            <input type="number" value={editorData.borderWidth} onChange={onBorderWidthChange} />
            <Canvas 
                id='canvas' 
                viewportHeight={50} 
                borderWidth={editorData.borderWidth} 
                borderColor={editorData.borderColor} 
            />
        </>
    );
}

export default Editor;