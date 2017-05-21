import {Player, Char as PlayerChar, Pool as PlayerPool} from "./Game/Player";
import {Board, Coordinate} from "./Game/Board";

export default class Game {
    private readonly board = new Board();
    private strategy: Strategy = new ActiveGame();

    public getBoard(): string {
        return this.board.toString();
    }

    public getActivePlayer(): PlayerChar | undefined {
        return this.strategy.getActivePlayerChar();
    }

    public move(row: Coordinate, col: Coordinate): void {
        this.strategy = this.strategy.move(row, col, this.board);
    }

    public getScore(): string {
        return this.strategy.getScore()
    }
}

interface Strategy {
    getActivePlayerChar(): PlayerChar | undefined;
    getScore(): string;
    move(row: Coordinate, col: Coordinate, board: Board): Strategy;
}

class ActiveGame implements Strategy {
    private readonly players = new PlayerPool();

    getActivePlayerChar(): PlayerChar {
        return this.players.getActive().char;
    }

    getScore(): string {
        throw new Error("Game is not finished");
    }

    move(row: Coordinate, col: Coordinate, board: Board): Strategy
    {
        const player = this.players.getActive();
        board.getCellAt(row, col).giveTo(player);
        if (board.getLines().some((line) => line.belongsTo(player))) {
            return new FinishedGame(player);
        }
        if (board.isFull()) {
            return new FinishedGame();
        }
        this.players.next();
        return this;
    }
}

class FinishedGame implements Strategy {
    public constructor(private readonly winner?: Player) {
    }

    getActivePlayerChar(): undefined {
        return;
    }

    getScore(): string {
        return this.winner ? `${this.winner.char} won!` : 'Draw!';
    }

    move(): Strategy {
        throw new Error("Game is finished");
    }
}
