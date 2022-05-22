export enum Orientation {
    Horizontal,
    Vertical
}

export function getDeviceOrientation(): Orientation {
    return window.innerWidth > window.innerHeight ? Orientation.Horizontal : Orientation.Vertical;
}