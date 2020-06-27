"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const game_1 = require("./game");
var context;
const squareSize = 30;
const backgroundColor = '#070707';
const arenaColor = '#1a2226';
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
    drawSquare: (head, color) => {
        context.fillStyle = color;
        switch (head.direction) {
            case game_1.Direction.UP:
                context.fillRect((head.x * squareSize) + offset_x + 1, (head.y * squareSize) + offset_y + 1, squareSize - 2, squareSize);
                break;
            case game_1.Direction.DOWN:
                context.fillRect((head.x * squareSize) + offset_x + 1, (head.y * squareSize) + offset_y - 1, squareSize - 2, squareSize);
                break;
            case game_1.Direction.RIGHT:
                context.fillRect((head.x * squareSize) + offset_x - 1, (head.y * squareSize) + offset_y + 1, squareSize, squareSize - 2);
                break;
            case game_1.Direction.LEFT:
                context.fillRect((head.x * squareSize) + offset_x + 1, (head.y * squareSize) + offset_y + 1, squareSize, squareSize - 2);
                break;
            default:
                context.fillRect((head.x * squareSize) + offset_x + 1, (head.y * squareSize) + offset_y + 1, squareSize - 2, squareSize - 2);
                break;
        }
    },
    eraseSquare: (point) => {
        context.fillStyle = arenaColor;
        context.fillRect(point.x * squareSize + offset_x - 1, point.y * squareSize + offset_y - 1, squareSize + 2, squareSize + 2);
    },
    printFail: () => {
        context.font = '48px menlo';
        context.fillStyle = 'red';
        context.fillText('Fail!', 200, 50);
    },
    dashboard: (head, size) => {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, 810, 200);
        context.font = '20px menlo';
        context.fillStyle = 'green';
        context.fillText(`head: (${head.x},${head.y})`, 10, 30);
        context.fillText(`size: ${size}`, 10, 60);
    }
};
exports.Canvas = Canvas;
