import { ItemID } from "../models/items.js";
import { Cell } from "./Cell.js";

import { plants } from "../data/plants.js";

export class GameBoard {
  public size: number;
  public gameTick: number;
  public elements: HTMLDivElement[];
  public cellsInstances: Cell[];
  public onSellResources: (value: number) => void;

  constructor(size: number = 8, gameTick: number = 1) {
    this.size = size;
    this.gameTick = gameTick;
    this.cellsInstances = [];
    this.elements = [];
    this.onSellResources = () => {};
    this.create();
  }

  private create = (): void => {
    for (let index = 0; index < this.size * this.size; index++) {
      const cell = new Cell();
      this.cellsInstances.push(cell);
      this.elements.push(cell.element);
    }
  };

  public startGameTicker = (): void => {
    setInterval(() => {
      for (const cell of this.cellsInstances) {
        cell.startGameTick();
      }
    }, 1000 * this.gameTick);
  };

  public changeItemMenu = (itemID: ItemID) => {
    this.cellsInstances.forEach((cell) => {
      const currentItem = plants.find((plant) => plant.id === itemID);
      cell.setItem(currentItem);
    });
  };

  public eventInitialization = (): void => {
    this.cellsInstances.forEach((cell) => {
      cell.onWriteOffResources = this.onSellResources;
    });
  }
}
