import { bot } from './bot';
import { Canvas } from './canvas';

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
    Canvas.drawSquare(head.x, head.y, 'gray');     
    
    if(filu.length > filuSize) {
        Canvas.eraseSquare(filu[0].x, filu[0].y)
        filu = filu.slice(1);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function food() {
    do {
        target.x = getRandomInt(20);
        target.y = getRandomInt(20);
    } while (isInFilu());
    Canvas.drawSquare(target.x, target.y, 'green');
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
        food();
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
    Canvas.init();

    food();

    interval = setInterval(() => {
        draw();
        targetHit();

        var move = {
            code: ''
        };

        move.code = bot(target, head);

        keyDown(move);

        if(hitFilu() || hitBoundary()) {                        
            clearInterval(interval);

            Canvas.printFail();
        }
    }, 115);    
}   

show();
