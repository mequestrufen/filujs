"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = exports.UPPER_LEFT_LIMIT = exports.LOWER_RIGHT_LIMIT = exports.Head = exports.Point = exports.Direction = void 0;
const events_1 = __importDefault(require("events"));
var Direction;
(function (Direction) {
    Direction[Direction["LEFT"] = 0] = "LEFT";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["UP"] = 2] = "UP";
    Direction[Direction["DOWN"] = 3] = "DOWN";
    Direction[Direction["CENTER"] = 4] = "CENTER";
})(Direction = exports.Direction || (exports.Direction = {}));
;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point = Point;
;
class Head extends Point {
}
exports.Head = Head;
;
exports.LOWER_RIGHT_LIMIT = 20;
exports.UPPER_LEFT_LIMIT = -1;
class Game extends events_1.default.EventEmitter {
    constructor() {
        super();
        this.size = 1;
        this._alive = true;
        let startPoint = new Point(10, 10);
        this._body = new Array();
        this._body.push(startPoint);
        this._head = { x: startPoint.x, y: startPoint.y, direction: Direction.UP };
        this.food();
    }
    get length() {
        return this._body.length;
    }
    get head() {
        return this._head;
    }
    get body() {
        return this._body;
    }
    get target() {
        return this._target;
    }
    get isAlive() {
        return this._alive;
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
        if (this._body.length > this.size) {
            this.emit('erase', this._body[0].x, this._body[0].y);
            this._body = this._body.slice(1);
        }
        this._alive = !(this.hitBoundary() || this.hitItself());
        this.emit('step');
    }
    left() {
        if (this._head.direction !== Direction.RIGHT)
            this._head.direction = Direction.LEFT;
    }
    right() {
        if (this._head.direction !== Direction.LEFT)
            this._head.direction = Direction.RIGHT;
    }
    down() {
        if (this._head.direction !== Direction.UP)
            this._head.direction = Direction.DOWN;
    }
    up() {
        if (this._head.direction !== Direction.DOWN)
            this._head.direction = Direction.UP;
    }
    food(x, y) {
        if (x && y) {
            this._target = new Point(x, y);
        }
        else {
            do {
                this._target = new Point(this.getRandomInt(exports.LOWER_RIGHT_LIMIT), this.getRandomInt(exports.LOWER_RIGHT_LIMIT));
            } while (this.isInBody());
        }
        this.emit('food');
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    hitItself() {
        let dupl = 0;
        this._body.forEach((item) => {
            if (item.x === this._head.x && item.y === this._head.y) {
                dupl++;
            }
        });
        return (dupl === 2);
    }
    hitBoundary() {
        return (this._head.x < 0 || this._head.x > exports.LOWER_RIGHT_LIMIT - 1 || this._head.y < 0 || this._head.y > exports.LOWER_RIGHT_LIMIT - 1);
    }
    isInBody() {
        let res = false;
        this._body.forEach((item) => {
            if (item.x === this._target.x && item.y === this._target.y) {
                res = true;
            }
        });
        return res;
    }
}
exports.Game = Game;
;
