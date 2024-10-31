/**
 * @param {number} x 
 * @param {number} y 
 */
export function Vector(x, y) {
    this.x = x,
    this.y = y
}

/**
 * @param {Vector} vec 
 * @param {number} min
 * @param {number} max
 * @returns 
 */
export const vectorClampX = (vec, min, max) =>
    new Vector(
        Math.max(min, Math.min(vec.x, max)),
        vec.y
    );

/**
 * @param {Vector} vec
 * @param {number} x
*/
export const vectorSetX = (vec, x) => new Vector(x, vec.y);

/**
 * @param {Vector} vec
*/
export const vectorFlipX = vec => new Vector(vec.x * -1, vec.y);