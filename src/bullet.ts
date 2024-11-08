import { curry, ifElse } from "rambda";
import { Renderer } from "./main";
import { Player } from "./player";
import { from, setY, Vector } from "./vector";

export type Bullet = 
    | { kind: "Just", position: Vector }
    | { kind: "Nothing" };

export const SPEED = 300;
export const WIDTH = 10;
export const HEIGHT = 20;

export const init = (): Bullet => ({ kind: "Nothing" });

// Monadic bind
const map = (bullet: Bullet, unit: (pos: Vector) => Bullet): Bullet => {
    if(bullet.kind == "Just") {
        return unit(bullet.position);
    }
    return { kind: "Nothing" };
}

const calculatePosition = (keysPressed: Set<string>, spawnPos: Vector, bullet: Bullet, delta: number): Bullet => {
    const unit: (position: Vector) => Bullet =
        ifElse((pos: Vector) => pos.y < 0,
            _ => ({ kind: "Nothing" } as Bullet),
            pos => ({ kind: "Just", position: setY(pos, pos.y - SPEED * delta) } as Bullet)
        );
    
    if (keysPressed.has(" ") && bullet.kind == "Nothing") {
        return { kind: "Just", position: spawnPos } 
    } else {
        return map(bullet, unit);
    }
}

const render = (bullet: Bullet, ctx: CanvasRenderingContext2D) => {
    if(bullet.kind == "Just") {
        ctx.fillStyle = 'lime';
        ctx.fillRect(bullet.position.x, bullet.position.y, WIDTH, HEIGHT);
    }
}

export const renderer = (keysPressed: Set<string>, player: Player, bullet: Bullet): Renderer<Bullet> =>
    ({
        entity: bullet,
        compute: curry(calculatePosition)(keysPressed, from(player.x + WIDTH, player.y - HEIGHT)),
        render
    });