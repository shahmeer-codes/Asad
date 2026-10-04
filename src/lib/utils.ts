export type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassDictionary;
export interface ClassDictionary {
    [id: string]: any;
}
export interface ClassArray extends Array<ClassValue> { }

export function cn(...inputs: ClassValue[]) {
    return clsx(...inputs);
}

function clsx(...args: ClassValue[]): string {
    const classes: string[] = [];
    for (const arg of args) {
        if (!arg) continue;
        if (typeof arg === 'string' || typeof arg === 'number') classes.push(String(arg));
        else if (Array.isArray(arg)) classes.push(clsx(...arg));
        else if (typeof arg === 'object') {
            for (const [key, value] of Object.entries(arg)) {
                if (value) classes.push(key);
            }
        }
    }
    return classes.join(' ');
}

export function lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
}

export function mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
