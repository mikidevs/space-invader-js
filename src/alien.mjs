import { Vector, vectorFlipX, vectorSetX } from "./vector.mjs";

const _alien = {
    SPEED: 200,
    SIZE: 40
}

export const alien = Object.freeze(_alien);

/**
 * @param {Vector} position 
 * @param {Vector} velocity
 */
export function AlienTransform(position, velocity) {
    this.position = position,
    this.velocity = velocity 
}

/**
 * @param {AlienTransform} alienT
 * @param {number} canvasWidth
 * @param {number} delta
*/
export const calculateAlienT = (alienT, canvasWidth, delta) => {
    const newPos = vectorSetX(alienT.position, alienT.position.x + (alienT.velocity.x * delta));

    let newVelocity = alienT.velocity;
    if (alienT.velocity.x > 0 && newPos.x > canvasWidth - (2 * alien.SIZE) 
        || alienT.velocity.x < 0 && newPos.x < alien.SIZE) {
        newVelocity = vectorFlipX(alienT.velocity);
    }

    return new AlienTransform(newPos, newVelocity);
}

/**
 * @param {AlienTransform} alienT 
 * @param {CanvasRenderingContext2D} ctx 
 */
export const renderAlien = (alienT, ctx) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(alienT.position.x, alienT.position.y, alien.SIZE, alien.SIZE);
}