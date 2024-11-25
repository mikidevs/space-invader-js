import { Invader } from "./invaders";
import { Player } from "./player";
import { Vector } from "./vector";

export class Bullet {
    static SPEED = 350;
    static INV_SPEED = 300;
    static WIDTH = 10;
    static HEIGHT = 20;

    constructor() {
        this.position = null;
    }

    static of = () => new Bullet();

    playerBulletUpdateAndRender(ctx, keysPressed, canvasHeight, playerX, delta) {
        if (keysPressed.has(" ") && !this.position) {
            this.position = Vector.of(playerX + (Player.WIDTH / 2) - (Bullet.WIDTH / 2), canvasHeight - Player.HEIGHT);
        }

        if (this.position && this.position.y <= 0) {
            this.position = null;
        }

        if (this.position) {
            this.position.y -= Bullet.SPEED * delta;

            ctx.fillStyle = 'lime';
            ctx.fillRect(this.position.x, this.position.y, Bullet.WIDTH, Bullet.HEIGHT);
        }
    }

    enemyBulletUpdateAndRender(ctx, spawn, canvasHeight, invaderPos, delta) {
        if (spawn && !this.position) {
            this.position = Vector.of(invaderPos.x + (Invader.WIDTH / 2) - (Bullet.WIDTH / 2), invaderPos.y + Invader.HEIGHT);
        }

        if (this.position && this.position.y >= canvasHeight) {
            this.position = null;
        }

        if (this.position) {
            this.position.y += Bullet.INV_SPEED * delta;

            ctx.fillStyle = 'white';
            ctx.fillRect(this.position.x, this.position.y, Bullet.WIDTH, Bullet.HEIGHT);
        }
    }
}