var context;
const squareSize = 30;
const backgroundColor = '#070707';
const arenaColor = '#1a2226'
const offset_x = 5;
const offset_y = 205;

var Canvas = {    
    init: () => {
        let canvasElement = document.createElement("canvas");
        canvasElement.setAttribute('width', '610');
        canvasElement.setAttribute('height', '810');    
        document.body.appendChild(canvasElement);
        context = canvasElement.getContext('2d');
        
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvasElement.width, canvasElement.height);

        context.fillStyle = arenaColor;
        context.fillRect(0, 200, canvasElement.width, canvasElement.height);
    },
    drawSquare: (x, y, color, dir?) => {
        context.fillStyle = color;

        switch (dir) {
            case 'N':
                context.fillRect((x * squareSize) + offset_x +1, (y * squareSize) + offset_y +1, squareSize -2, squareSize);
                break;

            case 'S':
                context.fillRect((x * squareSize) + offset_x +1, (y * squareSize) + offset_y -1, squareSize -2, squareSize);
                break;
            
            case 'E':
                context.fillRect((x * squareSize) + offset_x -1, (y * squareSize) + offset_y +1, squareSize, squareSize -2);
                break;

            case 'O':
                context.fillRect((x * squareSize) + offset_x +1, (y * squareSize) + offset_y +1, squareSize, squareSize -2);
                break;

            default:
                context.fillRect((x * squareSize) + offset_x +1, (y * squareSize) + offset_y +1, squareSize -2, squareSize -2);
                break;
        }
    },
    eraseSquare: (x, y) => {
        context.fillStyle = arenaColor;
        context.fillRect(x * squareSize + offset_x -1, y * squareSize + offset_y -1, squareSize +2, squareSize +2);
    },
    printFail: () => {
        context.font = '48px menlo';
        context.fillStyle = 'red';
        context.fillText('Fail!', 200, 50);
    },
    dashboard: (head, size, filu) => {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 810, 200);
        context.font = '20px menlo';
        context.fillStyle = 'green';

        context.fillText(`head: (${head.x},${head.y})`, 10, 30);
        context.fillText(`size: ${size}`, 10, 60);
        context.fillText(`tail: (${filu[0].x}, ${filu[0].y})`, 10, 90);
    }
};

export { Canvas };
