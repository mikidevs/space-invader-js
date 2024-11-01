import  * as Alien from "./alien.js";
import * as Vector from "./vector.js";
import * as Player from "./player.js";
import { spawnBullet } from "./bullet.js";
import * as R from 'rambda';

/** @typedef {import("./types/Vector.d.ts").default} Vector */
/** @typedef {import("./types/AlienTransform.d.ts").default} AlienTransform */

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

  const newPlayerPos = Player.calculatePosition(prevPlayerPos, keysPressed, canvas.width, delta);
  Player.render(newPlayerPos, ctx);
  const bullet = spawnBullet(newPlayerPos, keysPressed);

  if (bullet) {

  }

  const monitor = prevAlienTs[0].velocity.x > 0 ? prevAlienTs[prevAlienTs.length - 1] : prevAlienTs[0];

  const newAlienT = R.pipe(
    R.map(t => Alien.calculateTransform(t, monitor, canvas.width, delta)),
    R.forEach(t => Alien.render(t, ctx))
  )(prevAlienTs);

  requestAnimationFrame((nextTime) => draw(nextTime, currentTime, newPlayerPos, newAlienT));
}

const initPlayerPos = Vector.create((canvas.width - Player.WIDTH) / 2, canvas.height - Player.HEIGHT);

const initAlienTs = Array.from({ length: 11 }, 
  (v, i) => Alien.create(Vector.create(i * 1.6 * Alien.SIZE, 50), Vector.create(Alien.SPEED, 0)));

requestAnimationFrame((currentTime) => draw(currentTime, 0, initPlayerPos, initAlienTs));