import events from 'events';

export enum Direction {
    LEFT,
    RIGHT,
    UP,
    DOWN,
    CENTER
};

export class Point {
    x: number;
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
};

export class Head extends Point {
    direction: Direction;
};

export const LOWER_RIGHT_LIMIT: number = 20;  
export const UPPER_LEFT_LIMIT = -1;

export class Game extends events.EventEmitter {  
    private size = 1;
    private _head: Head;
    private _body: Array<Point>;
   
    private _target: Point;
    private _alive: boolean = true;

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

    get isAlive(): boolean {
        return this._alive;
    }

    constructor() {       
        super();
        let startPoint = new Point(10, 10); 
        this._body = new Array();
        this._body.push(startPoint);
        this._head = {x: startPoint.x, y: startPoint.y, direction: Direction.UP};
        this.food();
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

        if (this._head.x === this._target.x && this._head.y === this._target.y) {
            this.size++;
            this.food();
        }

        this._body.push(new Point(this._head.x, this._head.y));

        if(this._body.length > this.size) {
            this.emit('erase', this._body[0].x, this._body[0].y);
            this._body = this._body.slice(1);
        }

        this._alive = !(this.hitBoundary() || this.hitItself());

        this.emit('step');
    }

    left() {
        if (this._head.direction !== Direction.RIGHT) this._head.direction = Direction.LEFT;
    }

    right() {
        if (this._head.direction !== Direction.LEFT) this._head.direction = Direction.RIGHT;
    }

    down() {
        if (this._head.direction !== Direction.UP) this._head.direction = Direction.DOWN;
    }

    up() {
        if (this._head.direction !== Direction.DOWN) this._head.direction = Direction.UP;
    }

    food(x?: number, y?: number) {     
        if (x && y) {
            this._target = new Point(x, y);
        } else {
            do {
                this._target = new Point(this.getRandomInt(LOWER_RIGHT_LIMIT), this.getRandomInt(LOWER_RIGHT_LIMIT));
            } while (this.isInBody());
        }   
        
        this.emit('food');
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private hitItself() {        
        let dupl = 0; 
        this._body.forEach((item) => {
            if(item.x === this._head.x && item.y === this._head.y) {
                dupl++;
            }
        });
        return (dupl === 2);    
    }

    private hitBoundary() {
        return (this._head.x < 0 || this._head.x > LOWER_RIGHT_LIMIT -1 || this._head.y < 0 || this._head.y > LOWER_RIGHT_LIMIT -1);
    }

    private isInBody() {
        let res = false;
        this._body.forEach((item) => {
            if(item.x === this._target.x && item.y === this._target.y) {
                res = true;
            }
        });
        return res;
    }
};
