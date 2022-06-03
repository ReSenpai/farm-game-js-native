import { Cell } from "./Cell.js";

export class GameBoard {
  public size: number;
  public gameTick: number;
  public elements: HTMLDivElement[];
  public cellsInstances: Cell[];

  constructor(size: number = 8, gameTick: number = 1) {
    this.size = size;
    this.gameTick = gameTick;
    this.cellsInstances = [];
    this.elements = [];
    this.create();
  }

  create = (): void => {
    for (let index = 0; index < this.size * this.size; index++) {
      const cell = new Cell();
      this.cellsInstances.push(cell);
      this.elements.push(cell.element);
    }
  };

  startGameTicker = (): void => {
    setInterval(() => {
      for (const cell of this.cellsInstances) {
        cell.startGameTick();
      }
    }, 1000 * this.gameTick)
  }
}
