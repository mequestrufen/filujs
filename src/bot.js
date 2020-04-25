function bot(target, head) {
    if (target.x < head.x) {
        return 'ArrowLeft';
    }

    if (target.x > head.x) {
        return 'ArrowRight';
    }

    if (target.y < head.y) {
        return 'ArrowUp';
    }

    if (target.y > head.y) {
        return 'ArrowDown';
    }
};

export { bot };