import * as Vector from "./vector.js";

/** @typedef {import("./types/Vector.d.ts").default} Vector */

export const SPEED = 275; // pixels per second
export const WIDTH = 40;
export const HEIGHT = 20;

/**
 * @param {Vector} playerPos 
 * @param {Set<string>} keysPressed 
 * @param {number} canvasWidth
 * @param {number} delta 
 * @returns {Vector}
 */
export const calculatePosition = (playerPos, keysPressed, canvasWidth, delta) => {
    let newPos = Vector.create(playerPos.x, playerPos.y);

    if (keysPressed.has('ArrowLeft')) {
        newPos = Vector.setX(newPos, newPos.x - SPEED * delta);
    }
    if (keysPressed.has('ArrowRight')) {
        newPos = Vector.setX(newPos, newPos.x + SPEED * delta);
    }

    return Vector.clampX(newPos, WIDTH, canvasWidth - (2 * WIDTH));
};

/**
 * @param {Vector} playerPos 
 * @param {CanvasRenderingContext2D} ctx 
 */
export const render = (playerPos, ctx) => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(playerPos.x, playerPos.y, WIDTH, HEIGHT);
};