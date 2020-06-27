"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
function bot(target, head) {
    if (target.x < head.x)
        return 'ArrowLeft';
    if (target.x > head.x)
        return 'ArrowRight';
    if (target.y < head.y)
        return 'ArrowUp';
    if (target.y > head.y)
        return 'ArrowDown';
    if (target.x === head.x) {
        console.log('vert');
        if (head.x < 10)
            return 'ArrowRight';
        return 'ArrowLeft';
    }
    if (target.y === head.y) {
        console.log('horz');
        if (head.y < 10)
            return 'ArrowDown';
        return 'ArrowUp';
    }
}
exports.bot = bot;
;
