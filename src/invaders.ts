import { curry, identity, ifElse } from "rambda";
import * as Vector from "./vector";
import { Renderer } from "./main";

type Invader = {
    position: Vector.Vector;
    velocity: Vector.Vector;
}

export type Invaders = Readonly<Invader>[][]

export const SPEED = 50;
export const SIZE = 35;

export const init = (): Invaders => 
    Array.from(
        { length: 5 },
        (_, i) => Array.from(
            {length: 11},
            (_, j) => (
                Object.freeze({ 
                    position: Vector.from(i * 1.6 * SIZE, 50 * j), 
                    velocity: Vector.from(SPEED, 0)
                } as Invader))
            )
    );

const outerInvader = (inv: Invader[]): Invader => {
    const first = inv[0];
    const dir = first.velocity.x > 0 ? Vector.max : Vector.min;

    return inv.reduce((acc, curr) => acc = 
        {position: dir(acc.position, curr.position), velocity: curr.velocity},
        {} as Invader);
}

const outerMost = (inv: Invaders): Invader =>
    outerInvader(inv.map(outerInvader));

const calculateTransform = (canvasWidth: number, inv: Invaders, delta: number): Invaders => {
    const monitor = outerMost(inv);

    // condition fn for when the aliens should move in the oposite direction
    const flipPred: (alienVel: Vector.Vector) => boolean = curry(
        (monitorPos: Vector.Vector, alienVel: Vector.Vector) =>
            alienVel.x > 0 && monitorPos.x > canvasWidth - (2 * SIZE) 
            || alienVel.x < 0 && monitorPos.x < SIZE)
            (monitor.position);

    return map2(inv, (i: Invader) => ({
        position: Vector.setX(i.position, i.position.x + (i.velocity.x * delta)),
        velocity: ifElse(flipPred, Vector.flipX, identity)(i.velocity)
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