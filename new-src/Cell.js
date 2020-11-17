import { Animal } from "./Animal.js";
import { BaseItem } from "./BaseItem.js";
import { CHICKEN, CHICKEN_RUS, COW, COW_RUS, EMPTY_CELL, EMPTY_CELL_RUS, WHEAT, WHEAT_RUS } from "./consts.js";
import { Menu } from "./Menu.js";
import { Plant } from "./Plant.js";

export class Cell {
    constructor(cellId) {
        this.element = document.createElement('div');
        this.cellId = cellId;
        this.cell = this.getCell();
        this.currentItem = new BaseItem(EMPTY_CELL, 0, this.cell);
        this.converter = {
            [WHEAT_RUS]: WHEAT,
            [CHICKEN_RUS]: CHICKEN,
            [COW_RUS]: COW,
            [EMPTY_CELL_RUS]: EMPTY_CELL
        }
        this.menu = new Menu({
            plantWheat: this.plantWheat,
            placeAnimal: this.placeAnimal,
            closeMenu: this.closeMenu
        });
        this.collectElement();
        this.menu.setMenuText(this.cellId);
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

    cleanCell = () => {
        this.currentItem.clearTimers();
        delete this.currentItem;
        this.cell.remove();
        this.cell = this.getCell();
        this.element.appendChild(this.cell);
    }

    plantWheat = (event) => {
        const currentPlant = event.target.innerHTML;
        this.cleanCell();
        this.currentItem = new Plant(this.converter[currentPlant], 10, this.cell);
        this.menu.close();
    }

    placeAnimal = (readyTime, foodTime) => (event) => {
        const currentPlant = event.target.innerHTML;
        this.cleanCell();
        this.currentItem = new Animal(this.converter[currentPlant], readyTime, foodTime, this.cell);
        this.menu.close();
    }

    closeMenu = () => {
        this.cleanCell();
        this.currentItem = new BaseItem(EMPTY_CELL, 0, this.cell);
        this.menu.close();
    }

}