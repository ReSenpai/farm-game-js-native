import { Cell } from "./Cell.js";
export class GameBoard {
    constructor(size = 8, gameTick = 1) {
        this.create = () => {
            for (let index = 0; index < this.size * this.size; index++) {
                const cell = new Cell();
                this.cellsInstances.push(cell);
                this.elements.push(cell.element);
            }
        };
        this.startGameTicker = () => {
            setInterval(() => {
                for (const cell of this.cellsInstances) {
                    cell.startGameTick();
                }
            }, 1000 * this.gameTick);
        };
        this.size = size;
        this.gameTick = gameTick;
        this.cellsInstances = [];
        this.elements = [];
        this.create();
    }
}
