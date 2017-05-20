import {Game} from "../src/Game";

describe('Game in initial state', () => {
    const game = new Game();
    it('should have empty board 3x3', () => {
        expect(game.getBoard()).toEqual(
            '   ' +
            '   ' +
            '   '
        )
    });
    it('should have player X move', () => {
        expect(game.getActivePlayer()).toEqual('X');
    });
});


describe('Game moves', () => {
    it('is not possible to use the same cell twice', () => {
        const game = new Game();
        game.move(1, 1);
        expect(() => game.move(1, 1)).toThrow(new Error('Cell is already used'));
    })
});

describe('Game won by X', () => {
    const moves: (0 | 1 | 2)[][] = [
        [1, 1], // X
        [0, 0], // O
        [0, 2], // X
        [1, 0], // O
        [2, 0], // X
    ];
    const expected = '' +
        'O X' +
        'OX ' +
        'X  ';

    const game = new Game();
    moves.map((m) => game.move(m[0], m[1]));
    it(`after moves ${moves} the board should be '${expected}'`, () => {
        expect(game.getBoard()).toEqual(expected);
    });
});

