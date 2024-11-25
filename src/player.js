import { Vector } from "./vector";

export class Player {
    static SPEED = 200; // pixels per second
    static WIDTH = 40;
    static HEIGHT = 20;

    constructor(x, y) {
        this.position = Vector.of(x, y);
    }

    static of = (x, y) => 
        new Player(x, y);

    updateAndRender(ctx, keysPressed, canvasWidth, delta) {
        if (keysPressed.has('ArrowLeft')) {
            this.position.x -= Player.SPEED * delta;
        } else if (keysPressed.has('ArrowRight')) {
            this.position.x += Player.SPEED * delta;
        }
        this.position.clampX(Player.WIDTH, canvasWidth - (2 * Player.WIDTH));
        this.render(ctx);
    }

    render(ctx) {
        ctx.fillStyle = 'lime';
        ctx.fillRect(this.position.x, this.position.y, Player.WIDTH, Player.HEIGHT);
    }
}