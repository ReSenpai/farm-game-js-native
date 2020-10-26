import { Animal } from "./Animal.js";
import { BaseItem } from "./BaseItem.js";
import { EMPTY_CELL, WHEAT } from "./consts.js";
import { Plant } from "./Plant.js";

export class Cell {
    constructor() {
        this.element = this.getElement();
        this.currentItem = new BaseItem(EMPTY_CELL, 0, this.element);
    }
 
    getElement() {
        const cell = document.createElement('div');

        cell.classList.add('cell', 'emptyCell');
        cell.onclick = () => this.event();

        return cell;
    }


    event() {
        if (this.currentItem.__proto__.constructor === BaseItem) {
            this.currentItem.removeSpans();
            this.currentItem = new Plant(WHEAT, 10, this.element);
            
        } else {
            // this.currentItem.event();
        }
    }
    /**
     * 
     * @param {*} itemName 
     */
    plantOnCell(itemName) {
        
    }

}