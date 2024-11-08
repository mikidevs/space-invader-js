import * as Invaders from "./invaders";
import * as Vector from "./vector";
import * as Player from "./player";
import * as Bullet from "./bullet";

type Time = DOMHighResTimeStamp;

type Entity = Player.Player | Invaders.Invaders | Bullet.Bullet;

type Compute<T extends Entity> = (entity: T, delta: number) => T;

export type Renderer<T extends Entity> = 
    { entity: T, compute: Compute<T>, render: (entity: T, ctx: CanvasRenderingContext2D) => void };

const canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game-canvas");
canvas.width = 900;
canvas.height = 600; 

// I'm cheating here with some mutable state
const keysPressed = new Set<string>();

document.addEventListener(
  "keydown",
  event => keysPressed.add(event.key)
);

document.addEventListener(
  "keyup",
  event => keysPressed.delete(event.key)
);

const ctx = <CanvasRenderingContext2D> canvas.getContext("2d");

const initPlayer = Vector.from((canvas.width - Player.WIDTH) / 2, canvas.height - Player.HEIGHT);
const playerRenderer = Player.renderer(keysPressed, canvas.width, initPlayer);

const initAliens = Invaders.init();
const invadersRender: Renderer<Invaders.Invaders> = Invaders.renderer(canvas.width, initAliens);

const bulletRenderer = Bullet.renderer(keysPressed, initPlayer, Bullet.init());

const draw = (currentTime: Time, lastUpdateTime: Time, renders: Renderer<Entity>[]) => {
  const delta = (currentTime - lastUpdateTime) / 1000;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const newRenders = renders.map(({entity, compute, render}) => {
    const newEntity = compute(entity, delta);
    render(newEntity, ctx);
    return {entity: newEntity, compute, render};
  });

  requestAnimationFrame((nextTime) => draw(nextTime, currentTime, newRenders));
}

requestAnimationFrame((currentTime) => draw(currentTime, 0, [
  playerRenderer as Renderer<Entity>,
  invadersRender as Renderer<Entity>,
  bulletRenderer as Renderer<Entity>
]));