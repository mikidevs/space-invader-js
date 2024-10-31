import { curry } from "../node_modules/rambda/index";
import { calculatePlayerPos, renderPlayer, Vector } from "./player.mjs";

/** @type {HTMLCanvasElement} */
const canvas =  /** @type {HTMLCanvasElement} */ (document.getElementById("game-canvas"));

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

let initPlayerPos = new Vector(canvas.width / 2, 450);

/**
 * @param {DOMHighResTimeStamp} currentTime 
 * @param {DOMHighResTimeStamp} lastUpdateTime
 * @param {Vector} previousPos
 */
function draw(currentTime, lastUpdateTime, previousPos) {
  const delta = (currentTime - lastUpdateTime) / 1000;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);


  // const newPos = calculatePlayerPos(previousPos, keysPressed, delta);
  // renderPlayer(newPos, ctx);

  requestAnimationFrame((nextTime) => draw(nextTime, currentTime, newPos));
}

requestAnimationFrame((currentTime) => draw(currentTime, 0, initPlayerPos));