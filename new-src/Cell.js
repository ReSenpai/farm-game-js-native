import { Animal } from "./Animal.js";
import { BaseItem } from "./BaseItem.js";
import { EMPTY_CELL, WHEAT } from "./consts.js";
import { Menu } from "./Menu.js";
import { Plant } from "./Plant.js";

export class Cell {
    constructor() {
        this.element = document.createElement('div');
        this.cell = this.getCell();
        this.currentItem = new BaseItem(EMPTY_CELL, 0, this.cell);
        this.menu = new Menu({
            plantOnCell: this.plantOnCell,
            cleanCell: this.cleanCell
        });
        this.collectElement();
    }
 
    getCell() {
        const cell = document.createElement('div');

        cell.classList.add('cell', 'emptyCell');
        cell.onclick = () => this.event();

        return cell;
    }

    collectElement() {
        this.element.append(this.cell, this.menu.getMenu());
    }


    event() {
        this.menu.show();
    }

    plantOnCell = () => {
        this.currentItem.clearTimers();
        delete this.currentItem;
        this.cell.remove();
        this.cell = this.getCell();
        this.element.appendChild(this.cell);
        this.currentItem = new Plant(WHEAT, 10, this.cell);
        this.menu.close();
    }

    cleanCell = () => {
        this.currentItem.clearTimers();
        delete this.currentItem;
        this.cell.remove();
        this.cell = this.getCell();
        this.element.appendChild(this.cell);
        this.currentItem = new BaseItem(EMPTY_CELL, 0, this.cell);
        this.menu.close();
    }

}