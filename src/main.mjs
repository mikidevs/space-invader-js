import { alien, AlienTransform, calculateAlienT, renderAlien } from "./alien.mjs";
import { calculatePlayerPos, player, renderPlayer } from "./player.mjs";
import { Vector } from "./vector.mjs";
import * as R from 'rambda';

/** @type {HTMLCanvasElement} */
export const canvas =  /** @type {HTMLCanvasElement} */ (document.getElementById("game-canvas"));

const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600; 

const keysPressed = new Set();

document.addEventListener(
  "keydown",
  event => keysPressed.add(event.key)
);

document.addEventListener(
  "keyup",
  event => keysPressed.delete(event.key)
)

/**
 * @param {DOMHighResTimeStamp} currentTime 
 * @param {DOMHighResTimeStamp} lastUpdateTime
 * @param {Vector} prevPlayerPos
 * @param {AlienTransform[]} prevAlienTs
 */
function draw(currentTime, lastUpdateTime, prevPlayerPos, prevAlienTs) {
  const delta = (currentTime - lastUpdateTime) / 1000;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const newPlayerPos = calculatePlayerPos(prevPlayerPos, keysPressed, canvas.width, delta);
  renderPlayer(newPlayerPos, ctx);

  const monitor = prevAlienTs[0].velocity.x > 0 ? prevAlienTs[prevAlienTs.length - 1] : prevAlienTs[0];

  const newAlienT = R.pipe(
    R.map(t => calculateAlienT(t, monitor, canvas.width, delta)),
    R.forEach(t => renderAlien(t, ctx))
  )(prevAlienTs);

  requestAnimationFrame((nextTime) => draw(nextTime, currentTime, newPlayerPos, newAlienT));
}

const initPlayerPos = new Vector((canvas.width - player.WIDTH) / 2, canvas.height - player.HEIGHT);

const initAlienTs = Array.from({ length: 11 }, 
  (v, i) => new AlienTransform(new Vector(i * 1.6 * alien.SIZE, 50), new Vector(alien.SPEED, 0)));

requestAnimationFrame((currentTime) => draw(currentTime, 0, initPlayerPos, initAlienTs));