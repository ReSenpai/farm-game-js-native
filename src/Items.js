import { CHICKEN, COW, DONE, PREPARING, WHEAT, WHEATS } from "./consts.js";

class BaseItem {
    /**
     * Behavior of items on the cells
     * @param {String} name item name
     * @param {Number} readyTime Time to get resources
     */
    constructor(name, readyTime) {
        this.name = name;
        this.readyTime = readyTime;
    }
    /**
     * Find and return the HTML element of the cell
     * @param {String} cellId Cell id
     */
    getCell(cellId) {
        return document.getElementById(cellId); 
    }
    /**
     * Get a resource icon
     * @param {String} item item name
     */
    getResourceIcon(item) {
        const сonverter = {
            [WHEAT]: '🌾',
            [CHICKEN]: '🥚',
            [COW]: '🥛',
        }
        return сonverter[item];
    }
    /**
     * Place an item on a cell
     * @param {HTMLElement} element Where the item will be placed
     * @param store State object
     */
    plantOnCell(element, store) {
        let [icon, readyTime, foodTime] = element.children;
        const id = element.id;
        const currentItem = store.cells[id].currentItem;
        const resourceIcon = this.getResourceIcon(currentItem);
        const timer = this._showTimerToReady(readyTime);

        store.setStatus(id, PREPARING);
        this.timerToReady().then(() => {
            let isHunger = store.getHungerStatus(id);
            clearInterval(timer);
            readyTime.innerHTML = '';
            store.setStatus(id, DONE);
            store.increaseResource(id, 1);
            icon.innerHTML = `${resourceIcon} ${store.getResource(id)}`;

            !isHunger && this.plantOnCell(element,store);
        });
    }
    /**
     * Show Time to get resources
     * @param {Number} readyTime Time to get resources
     * @returns Returns the timer. You can assign a variable at the call site and stop.
     */
    _showTimerToReady(readyTime) {
        let counter = 0;
        readyTime.innerHTML = `⏱️ ${this.readyTime}`;
        return setInterval(() => {
            counter++;
            readyTime.innerHTML = `⏱️ ${this.readyTime - counter}`;
        }, 1000);
    }
    /**
     * Get a timer
     * @param {Number} value timer value
     * @returns Promise
     */
    _getTimer(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, value * 1000)
        });
    }
    /**
     * Time to get resources
     */
    timerToReady = () => this._getTimer(this.readyTime);
}

export class Plants extends BaseItem {};

export class Animal extends BaseItem {
    /**
     * Interacting with an animal on a cell
     * @param {String} name Animal name
     * @param {Number} readyTime Time to get resources
     * @param {Number} foodTime Food time
     */
    constructor(name, readyTime, foodTime) {
        super(name, readyTime);
        this.foodTime = foodTime;
    }
    /**
     * Show time to end meals
     * @param {HTMLElement} foodTimeElement Where to show
     * @returns Returns the timer. You can assign a variable at the call site and stop.
     */
    _showEndOfMealTimer(foodTimeElement) {
        let counter = 0;
        foodTimeElement.innerHTML = `🥣 ${this.foodTime}`;
        return setInterval(() => {
            counter++;
            foodTimeElement.innerHTML = `🥣 ${this.foodTime - counter}`;
        }, 1000)
    }
    /**
     * Time to end meals
     */
    endOfMealTimer = () => this._getTimer(this.foodTime - 1);
    /**
     * Feed the animal
     * @param {HTMLElement} element 
     * @param store State object
     */
    eating(element, store, resources) {
        let [icon, readyTime, foodTime, hungerIcon] = element.children;
        const wheats = resources.getResource(WHEATS);
        if (wheats <= 0) return;
        
        resources.reduceResource(WHEATS, 1);

        const timer = this._showEndOfMealTimer(foodTime);
        
        store.setHunger(element.id, false);
        this.plantOnCell(element, store);
        hungerIcon.innerHTML = '';
        this.endOfMealTimer().then(() => {
            clearInterval(timer);
            hungerIcon.innerHTML = '🍽️';
            foodTime.innerHTML = '';
            store.setHunger(element.id, true);
        })
    }
}