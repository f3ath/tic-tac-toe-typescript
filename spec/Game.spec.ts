import Game from "../src/Game";

describe('Game in initial state', () => {
    const game = new Game();
    it('should have empty board 3x3', () => {
        expect(game.getBoard()).toEqual(
            '   ' +
            '   ' +
            '   '
        )
    });
    it('player X takes turn', () => {
        expect(game.getActivePlayer()).toEqual('X');
    });
});


describe('Game moves', () => {
    it('is not possible to use the same cell twice', () => {
        const game = new Game();
        game.move(1, 1);
        expect(() => game.move(1, 1)).toThrowError();
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
    it('has undefined active player', () => {
        expect(game.getActivePlayer()).toBeUndefined();
    });
    it('is not possible to make next move', () => {
        expect(() => game.move(2, 2)).toThrowError();
    });
    it('has winner', () => {
        expect(game.getWinner()).toEqual('X');
    })
});

describe('Game won by O', () => {
    const moves: (0 | 1 | 2)[][] = [
        [1, 1], // X
        [0, 0], // O
        [0, 2], // X
        [1, 0], // O
        [2, 2], // X
        [2, 0], // O
    ];
    const expected = '' +
        'O X' +
        'OX ' +
        'O X';

    const game = new Game();
    moves.map(([r, c]) => game.move(r, c));
    it(`after moves ${moves} the board should be '${expected}'`, () => {
        expect(game.getBoard()).toEqual(expected);
    });
    it('has undefined active player', () => {
        expect(game.getActivePlayer()).toBeUndefined();
    });
    it('is not possible to make next move', () => {
        expect(() => game.move(1, 2)).toThrowError();
    });
    it('has winner', () => {
        expect(game.getWinner()).toEqual('O');
    })
});

