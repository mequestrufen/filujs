
var context;
const squareSize = 30;
const backgroundColor = '#070707';

export default Canvas = {    
    init: () => {
        let canvasElement = document.createElement("canvas");
        canvasElement.setAttribute('width', '600');
        canvasElement.setAttribute('height', '600');    
        document.body.appendChild(canvasElement);
        context = canvasElement.getContext('2d');
        
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvasElement.width, canvasElement.height);
    
        context.font = '48px menlo';
    },
    drawSquare: (x, y, color) => {
        context.fillStyle = color;
        context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    
        context.fillStyle = backgroundColor;
        context.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
    },
    eraseSquare: (x, y) => {
        context.fillStyle = backgroundColor;
        context.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
    },
    printFail: () => {
        context.fillStyle = 'red';
        context.fillText('Fail!', 10, 50);
    }
};
