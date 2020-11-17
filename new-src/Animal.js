import { BaseItem } from "./BaseItem.js";
import { CHICKEN, COW } from "./consts.js";

export class Animal extends BaseItem {
    constructor(name, readyTime, foodTime, element) {
        super(name, readyTime, element);
        this.foodTime = foodTime;
        this.foodCounter = 0;
    }

    getResourceIcon(item) {
        const сonverter = {
            [COW]: '🥛',
            [CHICKEN]: '🥚'
        }
        return сonverter[item];
    }

    placeOnCell() {
        if (this.foodCounter > 0) {
            this.hungerIcon = '';
            this.plantToCell();
        } else {
            this.hungerIcon = '🍽️';
        }
    }
}