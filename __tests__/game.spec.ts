import Game from "../src/game";

test('Initialize the snake with a size of 3', () => {    
    let game = new Game();
    expect(game.size).toBe(3);
});
