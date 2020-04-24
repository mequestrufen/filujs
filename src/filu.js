var canvas;
var squareSize = 30;
var backgroundColor = '#070707';
var interval;

var boundarySize = 20;

var direction = 'S';
var filuSize = 3;
var head = {
    x: 10,
    y: 10   
};

var target = {
    x: 0,
    y: 0
};

var filu = []

document.addEventListener('keydown', keyDown);

function setCanvas(canvasElement) {
    canvas.fillStyle = backgroundColor;
    canvas.fillRect(0, 0, canvasElement.width, canvasElement.height);

    canvas.font = '48px menlo';
}

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
    drawSquare(head.x, head.y, 'gray');     
    
    if(filu.length > filuSize) {
        eraseSquare(filu[0].x, filu[0].y)
        filu = filu.slice(1);
    }
}

function drawSquare(x, y, color) {
    canvas.fillStyle = color;
    canvas.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);

    canvas.fillStyle = backgroundColor;
    canvas.strokeRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function eraseSquare(x, y) {
    canvas.fillStyle = backgroundColor;
    canvas.fillRect(x * squareSize, y * squareSize, squareSize, squareSize);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawTarget() {
    do {
        target.x = getRandomInt(20);
        target.y = getRandomInt(20);
    } while (isInFilu());
    drawSquare(target.x, target.y, 'green');
}

function isInFilu(x, y) {
    filu.forEach((item) => {
        if(item.x === target.x && item.y === target.y) {
            return true;
        }
    })
    return false;
}

function log(x, y) {
    console.log('x: ' + x + ' / y: ' + y);
}

function hitFilu() {
    //detect self inflictment   
    let dupl = 0; 
    filu.forEach((item) => {
        if(item.x === head.x && item.y === head.y) {
            dupl++;
        }
    });
    return (dupl === 2);    
}

function hitBoundary() {
    return (head.x < 0 || head.x > boundarySize -1 || head.y < 0 || head.y > boundarySize -1);
}

function targetHit() {
    if(head.x === target.x && head.y === target.y) {
        filuSize++;
        drawTarget();
    }    
}

function keyDown(e) {
    switch(e.code) {
        case 'ArrowUp':
            if (direction !== 'S') direction = 'N';
            break;

        case 'ArrowDown':
            if (direction !== 'N') direction = 'S';
            break;

        case 'ArrowLeft':
            if (direction !== 'E') direction = 'O';            
            break;                        

        case 'ArrowRight':
            if (direction !== 'O') direction = 'E';
            break;                     
    }
}

function show(){
    let canvasElement = document.createElement("canvas");
    canvasElement.setAttribute('width', '600');
    canvasElement.setAttribute('height', '600');    
    document.body.appendChild(canvasElement);

    if (canvasElement.getContext) {
      canvas = canvasElement.getContext('2d');
    }
    
    setCanvas(canvasElement);
    drawTarget();

    interval = setInterval(() => {
        draw();
        targetHit();

        if(hitFilu() || hitBoundary()) {                        
            clearInterval(interval);

            canvas.fillStyle = 'red';
            canvas.fillText('Fail!', 10, 50);
        }
    }, 115);    
}   

show();