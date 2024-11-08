import { curry } from "rambda";
import { Renderer } from "./main";
import { for2, map2 } from "./util";
import * as Vector from "./vector";

type Invader = {
    position: Vector.Vector;
    velocity: Vector.Vector;
}

export type Invaders = Readonly<Invader>[][]

export const SPEED = 25;
export const SIZE = 35;

export const init = (): Invaders => 
    Array.from(
        { length: 11 },
        (_, i) => Array.from(
            {length: 5},
            (_, j) => (
                Object.freeze({ 
                    position: Vector.from((i + 1) * 1.6 * SIZE, 50 * j), 
                    velocity: Vector.from(SPEED, 0)
                } as Invader))
            )
    );

const outerInvader = (inv: Invader[]): Invader => {
    const first = inv[0];
    const dir = first.velocity.x > 0 ? { fn: Vector.max, init: Vector.from(0, 0) } : 
                { fn: Vector.min, init: Vector.from(Infinity, Infinity)}

    return inv.reduce((acc, curr) => acc = 
        {position: dir.fn(acc.position, curr.position), velocity: curr.velocity},
        {position: dir.init} as Invader);
}

const outerMost = (inv: Invaders): Invader =>
    outerInvader(inv.map(outerInvader));

const calculateTransform = (canvasWidth: number, inv: Invaders, delta: number): Invaders => {
    const monitor = outerMost(inv);

    // condition fn for when the aliens should move in the opposite direction
    const flipPred = monitor.velocity.x > 0 && monitor.position.x > canvasWidth - (2 * SIZE) 
            || monitor.velocity.x < 0 && monitor.position.x < SIZE;

    const newX = (i: Invader) => i.position.x + (i.velocity.x * delta);

    return map2(inv, (i: Invader) => ({
        position: flipPred ? Vector.from(newX(i), i.position.y + SIZE) : Vector.setX(i.position, newX(i)),
        velocity: flipPred ? Vector.flipX(i.velocity) : i.velocity
    }));
};

const render = (inv: Invaders, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    for2(inv, i => ctx.fillRect(i.position.x, i.position.y, SIZE, SIZE));
}

export const renderer = (canvasWidth: number, inv: Invaders): Renderer<Invaders> =>
    ({
        entity: inv,
        compute: curry(calculateTransform)(canvasWidth),
        render
    })