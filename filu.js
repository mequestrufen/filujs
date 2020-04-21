var canvas;
var squareSize = 20;
var backgroundColor = '#070707';

var direction = 'S';
var filuSize = 7;
var head = {
    x: 7,
    y: 7    
};

var filu = []

document.addEventListener('keydown', keyDown);

function draw() {

    switch (direction) {
        case 'N':
            head.y--;            
            break;

        case 'S':
            head.y++;
            break;

        case 'O':
            head.x--;
            break;

        case 'E':
            head.x++;
            break;
    }

    var item = {
        x: head.x,
        y: head.y
    };

    filu.push(item);    
    drawSquare(head.x, head.y);     
    
    if(filu.length > filuSize) {
        eraseSquare(filu[0].x, filu[0].y)
        filu = filu.slice(1);
    }
}

function drawSquare(x, y) {
    canvas.fillStyle = 'rgb(200, 200, 200)';
    canvas.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

    canvas.fillStyle = backgroundColor;
    canvas.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function eraseSquare(x, y) {
    canvas.fillStyle = backgroundColor;
    canvas.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function keyDown(e) {
    switch(e.code) {
        case 'ArrowUp':
            direction = 'N';
            break;

        case 'ArrowDown':
            direction = 'S';
            break;

        case 'ArrowLeft':
            direction = 'O';
            break;                        

        case 'ArrowRight':
            direction = 'E'
            break;                     
    }
}

function show(){
    var canvasElement = document.getElementById('canvas');
    if (canvasElement.getContext) {
      canvas = canvasElement.getContext('2d');
    }

    canvas.fillStyle = backgroundColor;
    canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

    setInterval(() => {
        draw();
    }, 250);    
}   
