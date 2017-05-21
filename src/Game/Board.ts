import {Player} from "./Player";

export class Board {
    private cells: Cell[][] = [0, 1, 2].map(
        () => [0, 1, 2].map(
            () => new Cell()
        )
    );

    public toString(): string {
        return this.cells.map(
            (row) => row.map(
                (cell) => cell.toString()
            ).join('')
        ).join('');
    }

    public getCellAt(row: Coordinate, col: Coordinate): Cell {
        return this.cells[row][col];
    }

    public isFull(): boolean {
        return this.cells.reduce((all, row) => all.concat(row), []).every((cell) => cell.isTaken());
    }

    public getLines(): Line[] {
        const diagonals = [
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]],
        ];
        const cols = [0, 1, 2].map((c) => [[0, c], [1, c], [2, c]]);
        const rows = [0, 1, 2].map((r) => [[r, 0], [r, 1], [r, 2]]);
        return diagonals.concat(rows).concat(cols)
            .map((coordinate) => coordinate.map(([row, col]) => this.cells[row][col]))
            .map((cells) => new Line(cells));
    }
}

export type Coordinate = 0 | 1 | 2;

export class Cell {

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

    public isTaken(): boolean {
        return !!this.player;
    }
}

export class Line {

    public constructor(private readonly cells: Cell[]) {
    }
    public belongsTo(player: Player): boolean {
        return this.cells.every((c) => c.belongsTo(player));
    }
}


