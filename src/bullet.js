import { player } from "./player.js";
import { Vector, vectorSetY } from "./vector.js";

const _bullet = {
    SPEED: 320,
    WIDTH: 10,
    HEIGHT: 20,
}

export const bullet = Object.freeze(_bullet);

/**
 * @param {Vector} playerPos 
 * @param {Set<string>} keysPressed 
 */
export const spawnBullet = (playerPos, keysPressed) => {
    if (keysPressed.has(" ")) {
        return vectorSetY(playerPos, playerPos.y + player.HEIGHT);
    } else {
        return undefined;
    }
}
/**
 * @param {Vector} bulletPos 
 * @param {number} canvasHeight
 * @param {number} delta 
 */
export const calculateBulletPos = (bulletPos, canvasHeight, delta) {
    
}

/**
 * @param {Vector} bulletPos 
 * @param {CanvasRenderingContext2D} ctx 
 */
export const renderBullet = (bulletPos, ctx) => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(bulletPos.x, bulletPos.y, bullet.WIDTH, bullet.HEIGHT);
};