enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN
};

class Game {
    readonly size = 1;
    readonly head = {x: 10, y: 10, direction: Direction.UP};    

    step() {
        if (this.head.direction === Direction.LEFT) {
            this.head.x--;
        }

        if (this.head.direction === Direction.UP) {
            this.head.y--;
        }

        if (this.head.direction === Direction.RIGHT) {
            this.head.x++;
        }

        if(this.head.direction === Direction.DOWN) {
            this.head.y++;
        }
    }

    left() {
        this.head.direction = Direction.LEFT;
    }

    right() {
        this.head.direction = Direction.RIGHT;
    }

    down() {
        this.head.direction = Direction.DOWN;
    }

    up() {
        this.head.direction = Direction.UP;
    }
}

export default Game;
