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

    public getWinner(): PlayerChar | undefined {
        return this.strategy.getWinnerChar()
    }
}

interface Strategy {
    getActivePlayerChar(): PlayerChar | undefined;
    getWinnerChar(): PlayerChar | undefined;
    move(row: Coordinate, col: Coordinate, board: Board): Strategy;
}

class ActiveGame implements Strategy {
    private readonly players = new PlayerPool();

    getActivePlayerChar(): PlayerChar {
        return this.players.getActive().char;
    }

    getWinnerChar(): PlayerChar | undefined {
        return;
    }

    move(row: Coordinate, col: Coordinate, board: Board): Strategy
    {
        const player = this.players.getActive();
        board.getCellAt(row, col).giveTo(player);
        if (board.getLines().some((line) => line.belongsTo(player))) {
            return new FinishedGame(player);
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

    getWinnerChar(): PlayerChar | undefined {
        return this.winner ? this.winner.char : undefined;
    }

    move(): Strategy {
        throw new Error("Game is finished");
    }
}
