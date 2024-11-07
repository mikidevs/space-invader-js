import { match, P } from "ts-pattern";
import { Renderer } from "./main";
import * as Vector from "./vector";
import { curry } from "rambda";

export type Player = Vector.Vector;

export const SPEED = 275; // pixels per second
export const WIDTH = 40;
export const HEIGHT = 20;

const calculatePosition = (keysPressed: Set<string>, canvasWidth: number, player: Player, delta: number) => {
    const newPos = match(keysPressed)
        .with(P.when(s => s.has('ArrowLeft')), () => Vector.setX(player, player.x - SPEED * delta))
        .with(P.when(s => s.has('ArrowRight')), () => Vector.setX(player, player.x + SPEED * delta))
        .otherwise(() => player);

    return Vector.clampX(newPos, WIDTH, canvasWidth - (2 * WIDTH));
};

const render = (player: Player, ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'lime';
    ctx.fillRect(player.x, player.y, WIDTH, HEIGHT);
};

export const renderer = (keysPressed: Set<string>, canvasWidth: number, player: Player): Renderer<Player> =>
    ({
        entity: player,
        compute: curry(calculatePosition)(keysPressed, canvasWidth),
        render
    });