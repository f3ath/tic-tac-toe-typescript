export type Char = 'X' | 'O';

export class Player {
    constructor(public readonly char: Char) {
    }
}

export class Pool {
    private active = 0;
    private players = [new Player('X'), new Player('O')]

    public getActive(): Player {
        return this.players[this.active];
    }

    public next(): void {
        this.active = (this.active + 1) % this.players.length;
    }
}