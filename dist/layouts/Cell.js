import { CssClasses } from "../models/cssClasses.js";
import { Plants } from "../items/Plants.js";
import { ItemID } from "../models/items.js";
export class Cell {
    constructor() {
        this.createCell = () => {
            const cell = document.createElement("div");
            cell.classList.add(CssClasses.CELL, CssClasses.EMPTY_CELL);
            cell.onclick = () => this.handleClick();
            cell.oncontextmenu = (e) => this.handleClickContextMenu(e);
            this.element = cell;
        };
        this.handleClick = () => {
            if (this.placedItem) {
                this.handleSellResources();
            }
            else {
                this.plant();
            }
        };
        this.handleClickContextMenu = (event) => {
            event.preventDefault();
            this.clear();
            this.preventDefaultItemId();
        };
        this.plant = () => {
            if (this.element && this.selectedItem) {
                this.placedItem = new Plants(this.selectedItem);
                this.currentItemID = this.placedItem.id;
                this.element.style.backgroundImage = `url(${this.placedItem.image})`;
                this.element.append(...this.placedItem.itemElements);
                this.placedItem.runGrowthTimer();
            }
        };
        this.clear = () => {
            if (this.element && this.placedItem && this.placedItem.itemElements) {
                this.element.style.backgroundImage = `url('../../assets/grass.png')`;
                this.removeAllChildNodes(this.element);
                this.placedItem.clear();
                this.placedItem = null;
            }
        };
        this.handleSellResources = () => {
            var _a, _b;
            const currentResourcesCount = ((_a = this.placedItem) === null || _a === void 0 ? void 0 : _a.collectResources()) || 0;
            const currentResourcesCost = ((_b = this.placedItem) === null || _b === void 0 ? void 0 : _b.resourceCost) || 0;
            this.onWriteOffResources(currentResourcesCount * currentResourcesCost);
        };
        this.preventDefaultItemId = () => {
            this.currentItemID = ItemID.Grass;
        };
        this.setItem = (item) => {
            if (item) {
                this.selectedItem = item;
            }
        };
        this.startGameTick = () => {
            this.globalTicker++;
        };
        this.removeAllChildNodes = (parent) => {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        };
        this.element = document.createElement("div");
        this.selectedItem = null;
        this.placedItem = null;
        this.globalTicker = 0;
        this.currentItemID = ItemID.Grass;
        this.onWriteOffResources = () => { };
        this.createCell();
    }
}
