import * as Vector from "./vector.js";

/** @typedef {import("./types/Vector.d.ts").default} Vector */
/** @typedef {import("./types/AlienTransform.d.ts").default} AlienTransform */

export const SPEED = 50;
export const SIZE = 35;

/**
 * @param {Vector} position 
 * @param {Vector} velocity
 * @returns {AlienTransform}
 */
export function create(position, velocity) {
    return Object.freeze({position, velocity});
}

/**
 * @param {AlienTransform} alienT
 * @param {AlienTransform} monitor
 * @param {number} boundary
 * @param {number} delta
*/
export const calculateTransform = (alienT, monitor, boundary, delta) => {
    const newPos = Vector.setX(alienT.position, alienT.position.x + (alienT.velocity.x * delta));
    let newVelocity = alienT.velocity;
    if (alienT.velocity.x > 0 && monitor.position.x > boundary - (2 * SIZE) 
        || alienT.velocity.x < 0 && monitor.position.x < SIZE) {
        newVelocity = Vector.flipX(alienT.velocity);
    }

    return create(newPos, newVelocity);
}

/**
 * @param {AlienTransform} alienT 
 * @param {CanvasRenderingContext2D} ctx 
 */
export const render = (alienT, ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(alienT.position.x, alienT.position.y, SIZE, SIZE);
}