export class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clampX(min, max) {
        this.x = Math.max(min, Math.min(this.x, max));
    }

    flipX() {
        this.x *= -1;
    }

    static of = (x, y) =>
        new Vector(x, y);

    static min = (vec1, vec2) =>
        Vector.of(
            Math.min(vec1.x, vec2.x),
            Math.min(vec1.y, vec2.y)
        );

    static max = (vec1, vec2) =>
        Vector.of(
            Math.max(vec1.x, vec2.x),
            Math.min(vec1.y, vec2.y)
        );
}