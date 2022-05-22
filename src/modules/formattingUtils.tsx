export function formatAsPercentage(value: number): string {
    return value.toString() + '%';
}

export function formatAsVw(value: number): string {
    return value.toString() + 'vw';
}

export function formatAsHexStr(value: number): string {
    return '#' + value.toString(16);
}
