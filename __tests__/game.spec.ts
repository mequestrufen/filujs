import Game from "../src/game";

test('Initialize the snake with a size of 1', () => {    
    let game = new Game();
    expect(game.size).toBe(1);
});

test('The snake must start at (10, 10)', () => {
    let game = new Game();
    expect(game.head.x).toEqual(10);
    expect(game.head.y).toEqual(10);
});

test('The snake should move upwards after one step', () => {
    let game = new Game();
    game.step();
    expect(game.head.y).toEqual(9);
});

test('The snake should move left when direction changed to West before one step', () => {
    let game = new Game();
    game.left();
    game.step();
    expect(game.head.x).toEqual(9);
    expect(game.head.y).toEqual(10);
});

test('The snake should move right when direction changed to East before one step', () => {
    let game = new Game();
    game.right();
    game.step();
    expect(game.head.x).toEqual(11);
    expect(game.head.y).toEqual(10);
});

test('The snake should move downwards when direction changed to South before one step only if moving sideways', () => {
    let game = new Game();
    game.right();
    game.step();
    game.down();
    game.step();
    expect(game.head.x).toEqual(11);
    expect(game.head.y).toEqual(11);
});

test('The snake should move upwards when direction changed to North before one step only if moving sideways', () => {
    let game = new Game();
    game.left();
    game.step();
    game.up();
    game.step();
    expect(game.head.x).toEqual(9);
    expect(game.head.y).toEqual(9);
});

