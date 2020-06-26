import { Game, Point, Head, Direction } from '../src/game';
import { Canvas } from "../src/canvas";

const timeSpan: number = 150;

export class GameLoop {
    private game: Game;
    private loop: NodeJS.Timeout;

    constructor() {
        this.game = new Game();
        Canvas.init();
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
        
        this.game.on('erase', () => {
            Canvas.eraseSquare(this.game.body[0]);
        });
        
        document.addEventListener('keydown', (e) => {
            switch(e.code) {
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
        });

        this.game.food();

        this.loop = setInterval(() => {
            this.game.step();
            
            if (!this.game.isAlive) {
                clearInterval(this.loop);
                Canvas.printFail();
            }
            
        }, timeSpan);

    }
}