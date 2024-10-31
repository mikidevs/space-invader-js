import { Vector, vectorClampX, vectorSetX } from "./vector.mjs";

const _player = {
    // pixels per second
    SPEED: 300,
    WIDTH: 40,
    HEIGHT: 20,
}

export const player = Object.freeze(_player);

/**
 * @param {Vector} playerPos 
 * @param {Set<string>} keysPressed 
 * @param {number} canvasWidth
 * @param {number} delta 
 */
export const calculatePlayerPos = (playerPos, keysPressed, canvasWidth, delta) => {
    let newPos = new Vector(playerPos.x, playerPos.y);

    if (keysPressed.has('ArrowLeft')) {
        newPos = vectorSetX(newPos, newPos.x - player.SPEED * delta);
    }
    if (keysPressed.has('ArrowRight')) {
        newPos = vectorSetX(newPos, newPos.x + player.SPEED * delta);
    }

    return vectorClampX(newPos, player.WIDTH, canvasWidth - (2 * player.WIDTH));
}

/**
 * @param {Vector} playerPos 
 * @param {CanvasRenderingContext2D} ctx 
 */
export const renderPlayer = (playerPos, ctx) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(playerPos.x, playerPos.y, player.WIDTH, player.HEIGHT);
}