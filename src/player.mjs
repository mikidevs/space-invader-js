/**
 * @param {number} x 
 * @param {number} y 
 */
export function Vector(x, y) {
    this.x = x,
    this.y = y
}

// pixels per second
const SPEED = 200;

/**
 * @param {Set<string>} keysPressed 
 * @param {number} delta 
 * @param {Vector} playerPos 
 * @returns 
 */
export const calculatePlayerPos = (playerPos, keysPressed, delta) => {
    let newPos = new Vector(playerPos.x, playerPos.y);
    if (keysPressed.has('ArrowLeft')) newPos.x -= SPEED * delta;
    if (keysPressed.has('ArrowRight')) newPos.x += SPEED * delta;
    return newPos;
}

/**
 * @param {Vector} playerPos 
 * @param {CanvasRenderingContext2D} ctx 
 */
export const renderPlayer = (playerPos, ctx) => {
    ctx.beginPath();
    ctx.arc(playerPos.x, playerPos.y, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
}