import { CssClasses } from "../models/cssClasses.js";
import { Plants } from "../items/Plants.js";
import { IPlantsProps, ItemID } from "../models/items.js";

export class Cell {
  public element: HTMLDivElement;
  public selectedItem: Plants | null;
  private placedItem: Plants | null;
  public globalTicker: number;
  public currentItemID: ItemID;

  constructor() {
    this.element = document.createElement("div");
    this.selectedItem = null;
    this.placedItem = null;
    this.globalTicker = 0;
    this.currentItemID = ItemID.Grass;
    this.createCell();
  }

  private createCell = (): void => {
    const cell = document.createElement("div");
    cell.classList.add(CssClasses.CELL, CssClasses.EMPTY_CELL);
    cell.onclick = () => this.handleClick();
    cell.oncontextmenu = (e) => this.handleClickContextMenu(e);

    this.element = cell;
  };

  private handleClick = (): void => {
    this.clear();
    this.plant();
  };

  private handleClickContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
    this.clear();
    this.preventDefaultItemId();
  };

  public plant = (): void => {
    if (this.element && this.selectedItem?.itemElements) {
      this.placedItem = this.selectedItem;
      this.currentItemID = this.placedItem.id;
      this.element.style.backgroundImage = `url(${this.placedItem.image})`;
      this.element.append(...this.placedItem.itemElements);
      this.placedItem.runGrowthTimer();
    }
  };

  public clear = (): void => {
    if (this.element && this.placedItem && this.placedItem.itemElements) {
      this.element.style.backgroundImage = `url('../../assets/grass.png')`;
      this.removeAllChildNodes(this.element);
      this.placedItem.clear();
    }
  };

  private preventDefaultItemId = () => {
    this.currentItemID = ItemID.Grass;
  };

  public setItem = (item: IPlantsProps | undefined): void => {
    if (item) {
      this.selectedItem = new Plants(item);
    }
  };

  public startGameTick = (): void => {
    this.globalTicker++;
  };

  private removeAllChildNodes = (parent: HTMLDivElement) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
}
