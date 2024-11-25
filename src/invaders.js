import { Vector } from "./vector";

export class Invader {
    static SPEED = 20;
    static SIZE = 35;

    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
    }

    static of = (position, velocity) =>
        new Invader(position, velocity);

    overlaps = (pos) => 
       (this.position.x <= pos.x && pos.x <= this.position.x + Invader.SIZE) &&
       (this.position.y <= pos.y && pos.y <= this.position.y + Invader.SIZE) 
}

export class Invaders {
    constructor() {
        const row = i => Array.from({length: 11}, (_, j) => 
            Invader.of(Vector.of((j + 1) * 1.6 * Invader.SIZE, i * 50), Vector.of(Invader.SPEED, 0)))

        this.invaders = Array.from({length: 5}, (_, i) => row(i));
    }

    static of = () => new Invaders();

    #outerInvaderInArr(inv) {
        const first = inv[0];
        const dir = first.velocity.x > 0 ? { fn: Vector.max, init: Vector.of(0, 0) } : 
                    { fn: Vector.min, init: Vector.of(Infinity, Infinity)}

        return inv.reduce((acc, curr) => 
            ({position: dir.fn(acc.position, curr.position), velocity: curr.velocity}),
            {position: dir.init});
    }

    outerMostInvader = () => this.#outerInvaderInArr(this.invaders.map(this.#outerInvaderInArr));

    updateAndRender(ctx, canvasWidth, bullet, delta) {
        const monitor = this.outerMostInvader();

        // condition fn for when the aliens should move in the opposite direction
        const flipPred = monitor.velocity.x > 0 && monitor.position.x > canvasWidth - (1.5 * Invader.SIZE) 
                || monitor.velocity.x < 0 && monitor.position.x < Invader.SIZE / 2;
   
        ctx.fillStyle = 'white';

        let invToDestroy = null;
        
        this.invaders.forEach((invRow, rowIdx) => {
            invRow.forEach((inv, colIdx) => {
                // Handle collision
                if(bullet.instance && inv.overlaps(bullet.instance)) {
                    invToDestroy = {row: rowIdx, col: colIdx};
                    bullet.destroy();
                }

                // Handle update
                inv.position.x += (inv.velocity.x * delta);
                if(flipPred) {
                    inv.position.y += Invader.SIZE;
                    inv.velocity.flipX();
                    inv.velocity.x *= 1.1; 
                } 
                ctx.fillRect(inv.position.x, inv.position.y, Invader.SIZE, Invader.SIZE);
            });
        });
        if (invToDestroy) {
            this.invaders[invToDestroy.row].splice(invToDestroy.col, 1);
        }
    }
}