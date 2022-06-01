import { Plants } from "../items/Plants.js";
import { Cell } from "./Cell.js";

export class GameBoard {
  constructor(size = 8, gameTick = 1) {
    this.size = size;
    this.gameTick = gameTick;
    this.cellsInstances = [];
    this.elements = [];
    this.create();
  }

  create = () => {
    for (let index = 0; index < this.size * this.size; index++) {
      const cell = new Cell();

      cell.setEvent(() => {
        console.log('Press cell: ', index + 1);
        cell.place(new Plants({
          image: '../../assets/wheat.jpg',
          name: 'Пшеница',
          growthTime: 20,
          itemCount: 5,
          resourceCost: 1,
        }))
      });
      
      this.cellsInstances.push(cell);
      this.elements.push(cell.element);
    }
  };

  startGameTicker = () => {
    setInterval(() => {
      for (const cell of this.cellsInstances) {
        cell.startGameTick();
      }
    }, 1000 * this.gameTick)
  }
}
