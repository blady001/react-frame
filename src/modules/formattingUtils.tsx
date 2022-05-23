export function format(value: number, suffix: string): string {
    return value.toString() + suffix;
}

export function formatAsHexStr(value: number): string {
    return '#' + value.toString(16);
}
