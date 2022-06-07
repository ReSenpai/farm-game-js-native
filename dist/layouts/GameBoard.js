import { Cell } from "./Cell.js";
import { plants } from "../data/plants.js";
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
        this.changeItemMenu = (itemID) => {
            this.cellsInstances.forEach((cell) => {
                const currentItem = plants.find((plant) => plant.id === itemID);
                cell.setItem(currentItem);
            });
        };
        this.size = size;
        this.gameTick = gameTick;
        this.cellsInstances = [];
        this.elements = [];
        this.create();
    }
}
