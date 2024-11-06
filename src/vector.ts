export type Vector = Readonly<{
    x: number;
    y: number;
}>

export const from = (x: number, y: number): Vector => 
    Object.freeze({x, y});

export const clampX = (vec: Vector, min: number, max: number): Vector =>
    from(Math.max(min, Math.min(vec.x, max)), vec.y);

export const setX = (vec: Vector, x: number) => from(x, vec.y);

export const setY = (vec: Vector, y: number) => from(vec.x, y);

export const flipX = (vec: Vector) => from(vec.x * -1, vec.y);

export const min = (vec1: Vector, vec2: Vector) =>
    Object.freeze({x: Math.min(vec1.x, vec2.x), y: Math.min(vec1.y, vec2.y)});

export const max = (vec1: Vector, vec2: Vector) =>
    Object.freeze({x: Math.max(vec1.x, vec2.x), y: Math.max(vec1.y, vec2.y)});