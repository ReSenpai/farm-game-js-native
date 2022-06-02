import { actionType } from "../models/actions.js";
import { cssClasses } from "../models/cssClasses.js";
import { Plants } from "../items/Plants.js";

export class Cell {
  constructor() {
    this.element = null;
    this.currentItem = null;
    this.globalTicker = 0;
    this._actionType = actionType.clear;
    this.createCell();
  }

  set actionType(type) {
    this._actionType = type;
  }

  createCell = () => {
    const cell = document.createElement("div");
    cell.classList.add(cssClasses.CELL, cssClasses.EMPTY_CELL);
    cell.onclick = () => this.handleClick();
    this.element = cell;
  };

  handleClick = () => {
    this._actionType =
      this._actionType === actionType.clear
        ? actionType.plant
        : actionType.clear;

    switch (this._actionType) {
      case actionType.clear:
        return this.clear();
      case actionType.plant:
        return this.plant();
      default:
        return;
    }
  };

  plant = () => {
    this.currentItem = new Plants({
      image: "../../assets/wheat.jpg",
      name: "Пшеница",
      growthTime: 20,
      itemCount: 5,
      resourceCost: 1,
    });
    this.element.style.backgroundImage = `url(${this.currentItem.image})`;
    this.element.append(this.currentItem.timerElement);
    this.currentItem.runGrowthTimer();
  };

  clear = () => {
    this.element.style.backgroundImage = `url('../../assets/grass.png')`;
    this.element.removeChild(this.currentItem.timerElement);
    this.currentItem.stopGrowthTimer();
    this.currentItem = null;
  };

  setEvent = (event) => {
    this._event = event;
  };

  startGameTick = () => {
    this.globalTicker++;
  };
}
