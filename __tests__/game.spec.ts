import { Game, Direction} from "../src/game";

test('Initialize the snake with a length of 1', () => {    
    let game = new Game();
    expect(game.length).toBe(1);
});

test('The snake must start at (10, 10)', () => {
    let game = new Game();
    expect(game.head).toEqual({x: 10, y: 10, direction: Direction.UP});
});

test('The snake should move upwards three cells after three steps', () => {
    let game = new Game();
    game.step();
    game.step();
    game.step();

    expect(game.head.y).toEqual(7);
});

test('The snake should move left when direction changed to LEFT before one step', () => {
    let game = new Game();
    game.left();
    game.step();
    
    expect(game.head).toEqual({x: 9, y: 10, direction: Direction.LEFT});
});

test('The snake should move right when direction changed to RIGHT before one step', () => {
    let game = new Game();
    game.right();
    game.step();

    expect(game.head).toEqual({x: 11, y: 10, direction: Direction.RIGHT});
});

test('The snake should move downwards when direction changed to DOWN before one step only if moving sideways', () => {
    let game = new Game();
    game.right();
    game.step();
    game.down();
    game.step();

    expect(game.head).toEqual({x: 11, y: 11, direction: Direction.DOWN});
});

test('The snake should move upwards when direction changed to UP before one step only if moving sideways', () => {
    let game = new Game();
    game.left();
    game.step();
    game.up();
    game.step();

    expect(game.head).toEqual({x: 9, y: 9, direction: Direction.UP});
});

test('Food will set a new specific target', () => {
    let game = new Game();
    game.food(9, 10);

    expect(game.target).toEqual({x: 9, y: 10});
});

test('The snake body should grow one cell after getting food', () => {
    let game = new Game();
    game.food(10, 9);
    game.step();
    game.step();

    expect(game.length).toEqual(2);
    expect(game.body).toEqual([{x: 10, y: 9}, {x:10, y:8}]);
});

test('The snake dies when hits itself', () => {
    let game = new Game();    
    game.step();
    
    game.food(10, 8);
    game.step();

    game.food(9, 8);
    game.left();
    game.step()

    game.food(9, 9);
    game.down();
    game.step();

    game.food(9, 10);
    game.right();
    game.step();
        
    expect(game.isAlive).toBeFalsy();
});

test('The snake dies when hits a boundary', () => {
    let game = new Game();

    for (let step = 0; step <= 10; step++) {
        game.step();
    }

    expect(game.isAlive).toBeFalsy();
});

test('The snake food appears randomly in free space and not in space occupied by snake body', () => {
    let game = new Game();
    game.step();

    expect(game.target.x).toBeGreaterThan(0);
    expect(game.target.x).toBeLessThan(20);

    expect(game.target.y).toBeGreaterThan(0);
    expect(game.target.y).toBeLessThan(20);

    expect(game.target).not.toEqual({x: 10, y: 10});
    expect(game.target).not.toEqual({x: 10, y: 9});
});

test('The snake onStep callback attached to step event run once when step is invoked', () => {
    let game = new Game();
    let onStep = jest.fn();

    game.on('step', onStep);
    game.step();

    expect(onStep).toBeCalledTimes(1);
});

test('The snake onFood callback attached to food event run once when food is invoked', () => {
    let game = new Game();
    let onFood = jest.fn();

    game.on('food', onFood);
    game.food();

    expect(onFood).toBeCalledTimes(1);
});
