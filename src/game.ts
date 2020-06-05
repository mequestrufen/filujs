type Head = {
    x: number,
    y: number,
    direction: Direction
};

export enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN
};

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
};

export class Game {    
    private size = 1;
    private _head: Head;
    private _body: Array<Point>;
    
    private _target: Point;

    get length(): number {
        return this._body.length;
    }

    get head(): Head {
        return this._head;
    }

    get body(): Array<Point> {
        return this._body;
    }

    get target(): Point {
        return this._target;
    }

    constructor() {       
        let startPoint = new Point(10, 10); 
        this._body = new Array();
        this._body.push(startPoint);
        this._head = {x: startPoint.x, y: startPoint.y, direction: Direction.UP};
        this._target = new Point(9, 10); //new random target
    }

    step() {
        switch (this._head.direction) {
            case Direction.UP:
                this._head.y--;            
                break;
    
            case Direction.DOWN:
                this._head.y++;
                break;
    
            case Direction.LEFT:
                this._head.x--;
                break;
    
            case Direction.RIGHT:
                this._head.x++;
                break;
        }

        this._body.push(new Point(this._head.x, this._head.y));

        if(this._body.length > this.size) {
            //erase square HERE
            this._body = this._body.slice(1);
        }
    
        // Draw square HERE

        if (this._head.x === this._target.x && this._head.y === this._target.y) {
            this.size++;
        }
    }

    left() {
        this._head.direction = Direction.LEFT;
    }

    right() {
        this._head.direction = Direction.RIGHT;
    }

    down() {
        this._head.direction = Direction.DOWN;
    }

    up() {
        this._head.direction = Direction.UP;
    }

    food(x: number, y: number) {        
        this._target = new Point(x, y);
    }
};
