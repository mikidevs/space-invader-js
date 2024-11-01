/** @typedef {import("./types/Vector.d.ts").default} Vector */

/**
 * @param {number} x 
 * @param {number} y
 * @returns {Vector}
 */
export const create = (x, y) => Object.freeze({x, y});

/**
 * @param {Vector} vec 
 * @param {number} min
 * @param {number} max
 * @returns 
 */
export const clampX = (vec, min, max) =>
    create(
        Math.max(min, Math.min(vec.x, max)),
        vec.y
    );

/**
 * @param {Vector} vec
 * @param {number} x
*/
export const setX = (vec, x) => create(x, vec.y);

/**
 * @param {Vector} vec
 * @param {number} y
*/
export const setY = (vec, y) => create(vec.x, y);

/**
 * @param {Vector} vec
*/
export const flipX = vec => create(vec.x * -1, vec.y);