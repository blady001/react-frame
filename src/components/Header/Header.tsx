import './Header.css';

export function SimpleHeader() {
    return <h1 className='header'>FrameTool</h1>;
}

interface MenuHeaderProps {
    inputElementId: string,
    onDownload: () => void
}

export function MenuHeader(props: MenuHeaderProps) {
    return (
        <div className='header-container'>
            <label htmlFor='fileinput'>
                <span className="material-symbols-outlined">
                    add_photo_alternate
                </span>
            </label>
            <div className='header-wrapper'>
                <h1 className='header menu-header'>FrameTool</h1>
            </div>
            {/* <span onClick={props.onDownload}>download</span> */}
            <span onClick={props.onDownload} className="material-symbols-outlined">
                download
            </span>
        </div>
    );
}