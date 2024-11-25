import { Bullet } from "./bullet";
import { Invaders } from "./invaders";
import { Player } from "./player";

const canvas = document.getElementById("game-canvas");
canvas.width = 900;
canvas.height = 600; 

const ctx = canvas.getContext("2d");

const keysPressed = new Set();

document.addEventListener(
  "keydown",
  event => keysPressed.add(event.key)
);

document.addEventListener(
  "keyup",
  event => keysPressed.delete(event.key)
);

const player = Player.of((canvas.width - Player.WIDTH) / 2, canvas.height - Player.HEIGHT);
const invaders = Invaders.of();
const bullet = Bullet.of();

function draw(currentTime, lastUpdatedTime) {
  const delta = (currentTime - lastUpdatedTime) / 1000;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.updateAndRender(ctx, keysPressed, canvas.width, delta);
  bullet.updateAndRender(ctx, keysPressed, canvas.height, player.position.x, delta);
  invaders.updateAndRender(ctx, canvas.width, bullet, delta);
  // return
  requestAnimationFrame(nextTime => draw(nextTime, currentTime));
}

requestAnimationFrame(currentTime => draw(currentTime, 0));