export class Game {
    private readonly board = new Board();
    private readonly players = new PlayerPool([new Player('X'), new Player('O')]);
    private winner: Player;

    public getBoard(): string {
        return this.board.toString();
    }

    public getActivePlayer(): 'X' | 'O' | undefined {
        if (this.winner) {
            return;
        }
        return this.players.getActive().char;
    }

    public move(row: 0 | 1 | 2, col: 0 | 1 | 2): void {
        if (this.winner) {
            throw new Error('Game is finished');
        }
        const player = this.players.getActive();
        this.board.getCellAt(row, col).giveTo(player);
        if (this.isWinner(player)) {
            this.winner = player;
        } else {
            this.players.next();
        }
    }

    public getWinner(): 'X' | 'O' | undefined {
        if (this.winner) {
            return this.winner.char;
        }
    }

    private isWinner(player: Player): boolean {
        return this.board.getLines().some((line) => line.belongsTo(player))
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

    public getLines(): Line[] {
        const sel = (c: (0|1|2)[]) => c.map((c) => this.cells[c[0]][c[1]]);
        const diagonals = [
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];
        const columns = [0, 1, 2].map((col) => [[0, col], [1, col], [2, col]]);
        const rows = [0, 1, 2].map((row) => [[row, 0], [row, 1], [row, 2]]);
        return diagonals.concat(rows).concat(columns).map(sel).map((line) => new Line(line));
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

    public belongsTo(player: Player): boolean {
        return player === this.player;
    }
}

class Line {
    public constructor(private readonly cells: Cell[]) {
    }

    public belongsTo(player: Player): boolean {
        return this.cells.every((c) => c.belongsTo(player));
    }
}

class Player {
    constructor(public readonly char: 'X' | 'O') {
    }
}

type Coordinate = 0 | 1 | 2;
