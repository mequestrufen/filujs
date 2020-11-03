import { Game, Point, Head, Direction } from './game';
import { Canvas } from "./canvas";
import { bot } from "./bot"; 

const timeSpan: number = 150;

export class GameLoop {
    private game: Game;
    private loop: NodeJS.Timeout;

    constructor() {
        this.game = new Game();
        Canvas.init();
    }

    private keyDown(code) {
        switch(code) {
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

    private agent() {
        this.keyDown(bot(this.game.target, this.game.head));
    }
    
    start() {
        this.game.on('step', () => {
            Canvas.drawSquare(this.game.head, 'gray');
        });
        
        this.game.on('food', () => {
            let food = new Head(this.game.target.x, this.game.target.y);
            food.direction = Direction.CENTER;
            Canvas.drawSquare(food, 'green');
        });
        
        this.game.on('erase', (x, y) => {            
            Canvas.eraseSquare(new Point(x, y));
        });
        
        document.addEventListener('keydown', (e) => {
            this.keyDown(e.code);
        });

        this.game.food();

        this.loop = setInterval(() => {
            this.game.step();

            this.agent();

            Canvas.dashboard(this.game.head, this.game.length);
            
            if (!this.game.isAlive) {
                clearInterval(this.loop);
                Canvas.printFail();
            }
            
        }, timeSpan);

    }
}