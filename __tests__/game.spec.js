import { game } from "/src/game";

test('Initialize the snake with a size of 3', () => {
    expect(game.size).toBe(3);
});
