import './Header.css';

export function SimpleHeader() {
    return <h1 className='header'>FrameTool</h1>;
}

export function MenuHeader() {
    return (
        <div className='header-container'>
            <div>a</div>
            <div className='header-wrapper'>
                <h1 className='header menu-header'>FrameTool</h1>
            </div>
            <div>b</div>
        </div>
    );
}