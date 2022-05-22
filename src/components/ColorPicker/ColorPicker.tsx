import { HexColorPicker } from 'react-colorful';
import './ColorPicker.css';

interface ColorPickerProps {
    color: string,
    onDismiss: () => void,
    onColorChange: (_: string) => void
}

function ColorPicker(props: ColorPickerProps) {
    return (
        <div id='color-picker'>
            <HexColorPicker color={props.color} onChange={props.onColorChange} />
            <button onClick={props.onDismiss}>Done</button>
        </div>
    );
}

export default ColorPicker;