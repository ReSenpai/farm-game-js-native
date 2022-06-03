import { ActionType } from "../models/actions.js";
import { CssClasses } from "../models/cssClasses.js";
import { Plants } from "../items/Plants.js";
export class Cell {
    constructor() {
        this.createCell = () => {
            const cell = document.createElement("div");
            cell.classList.add(CssClasses.CELL, CssClasses.EMPTY_CELL);
            cell.onclick = () => this.handleClick();
            this.element = cell;
        };
        this.handleClick = () => {
            if (this.actionType === ActionType.Clear) {
                this.actionType = ActionType.Plant;
            }
            else {
                this.actionType = ActionType.Clear;
            }
            switch (this.actionType) {
                case ActionType.Clear:
                    return this.clear();
                case ActionType.Plant:
                    return this.plant();
                default:
                    return;
            }
        };
        this.plant = () => {
            this.currentItem = new Plants({
                image: "../../assets/wheat.jpg",
                name: "Пшеница",
                growthTime: 20,
                itemCount: 5,
                resourceCost: 1,
            });
            if (this.element && this.currentItem.timerElement) {
                this.element.style.backgroundImage = `url(${this.currentItem.image})`;
                this.element.append(this.currentItem.timerElement);
                this.currentItem.runGrowthTimer();
            }
        };
        this.clear = () => {
            if (this.element && this.currentItem && this.currentItem.timerElement) {
                this.element.style.backgroundImage = `url('../../assets/grass.png')`;
                this.element.removeChild(this.currentItem.timerElement);
                this.currentItem.stopGrowthTimer();
                this.currentItem = null;
            }
        };
        this.startGameTick = () => {
            this.globalTicker++;
        };
        this.element = document.createElement("div");
        this.currentItem = null;
        this.globalTicker = 0;
        this.actionType = ActionType.Clear;
        this.createCell();
    }
}
