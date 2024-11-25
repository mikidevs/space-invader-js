import { Player } from "./player";
import { Vector } from "./vector";

export class Bullet {
    static SPEED = 350;
    static WIDTH = 10;
    static HEIGHT = 20;

    constructor() {
        this.instance = null;
    }

    static of = () => new Bullet();

    updateAndRender(ctx, keysPressed, canvasHeight, playerX, delta) {
        if (keysPressed.has(" ") && !this.instance) {
            this.instance = Vector.of(playerX + (Player.WIDTH / 2) - (Bullet.WIDTH / 2), canvasHeight - Player.HEIGHT);
        }

        if (this.instance && this.instance.y <= 0) {
            this.instance = null;
        }

        if (this.instance) {
            this.instance.y -= Bullet.SPEED * delta;

            ctx.fillStyle = 'lime';
            ctx.fillRect(this.instance.x, this.instance.y, Bullet.WIDTH, Bullet.HEIGHT);
        }
    }

    destroy() {
        this.instance = null;
    }
}