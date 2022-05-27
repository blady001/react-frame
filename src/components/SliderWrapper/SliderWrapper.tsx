import './SliderWrapper.css';
import Slider from "rc-slider";

interface SliderWrapper {
    min: number,
    max: number,
    defaultValue: number,
    onChange: (value: number | number[]) => void
}

export function SliderWrapper(props: SliderWrapper) {
    return (
        <div>
            <Slider
                min={0}
                max={10}
                defaultValue={props.defaultValue}
                onChange={props.onChange}
            />
        </div>
    );
}