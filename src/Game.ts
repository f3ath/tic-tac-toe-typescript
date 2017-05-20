export class Game {
    private readonly board = new Board();
    private readonly players = new PlayerPool([new Player('X'), new Player('O')]);

    public getBoard(): string {
        return this.board.toString();
    }

    public getActivePlayer(): string | undefined {
        return this.players.getActive().char;
    }

    move(row: 0 | 1 | 2, col: 0 | 1 | 2): void {
        this.board.getCellAt(row, col).giveTo(this.players.getActive());
        this.players.next();
    }
}

class PlayerPool {
    private active = 0;

    public constructor(private readonly players: Player[]) {
    }

    public getActive(): Player {
        return this.players[this.active];
    }

    public next(): void {
        this.active = (this.active + 1) % this.players.length;
    }
}

class Board {
    private cells: Cell[][] = [
        [new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell()],
        [new Cell(), new Cell(), new Cell()],
    ];

    public toString(): string {
        return this.cells.map(
            (row: Cell[]) => row.map(
                (c: Cell) => c.toString()
            ).join('')
        ).join('');
    }

    public getCellAt(row: Coordinate, col: Coordinate): Cell {
        return this.cells[row][col];
    }
}

class Cell {
    private player: Player;

    public toString(): string {
        return this.player ? this.player.char : ' ';
    }

    public giveTo(player: Player): void {
        if (this.player) {
            throw new Error('Cell is already used');
        }
        this.player = player;
    }

    public isTakenBy(player: Player): boolean {
        return this.player === player;
    }
}

class Player {
    constructor(public readonly char: string) {
    }
}

type Coordinate = 0 | 1 | 2;
