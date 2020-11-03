"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameLoop = void 0;
const game_1 = require("./game");
const canvas_1 = require("./canvas");
const bot_1 = require("./bot");
const timeSpan = 150;
class GameLoop {
    constructor() {
        this.game = new game_1.Game();
        canvas_1.Canvas.init();
    }
    keyDown(code) {
        switch (code) {
            case 'ArrowUp':
                this.game.up();
                break;
            case 'ArrowDown':
                this.game.down();
                break;
            case 'ArrowLeft':
                this.game.left();
                break;
            case 'ArrowRight':
                this.game.right();
                break;
        }
    }
    agent() {
        this.keyDown(bot_1.bot(this.game.target, this.game.head));
    }
    start() {
        this.game.on('step', () => {
            canvas_1.Canvas.drawSquare(this.game.head, 'gray');
        });
        this.game.on('food', () => {
            let food = new game_1.Head(this.game.target.x, this.game.target.y);
            food.direction = game_1.Direction.CENTER;
            canvas_1.Canvas.drawSquare(food, 'green');
        });
        this.game.on('erase', (x, y) => {
            canvas_1.Canvas.eraseSquare(new game_1.Point(x, y));
        });
        document.addEventListener('keydown', (e) => {
            this.keyDown(e.code);
        });
        this.game.food();
        this.loop = setInterval(() => {
            this.game.step();
            this.agent();
            canvas_1.Canvas.dashboard(this.game.head, this.game.length);
            if (!this.game.isAlive) {
                clearInterval(this.loop);
                canvas_1.Canvas.printFail();
            }
        }, timeSpan);
    }
}
exports.GameLoop = GameLoop;
