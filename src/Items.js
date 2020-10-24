import { DONE, PREPARING } from "./consts.js";

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
     * Place an item on a cell
     * @param {HTMLElement} element Where the item will be placed
     * @param setStatus Callback function to set status
     */
    plantOnCell(element, setStatus) {
        let [icon, readyTime, foodTime] = element.children;
        const timer = this._showTimerToReady(readyTime);

        setStatus(element.id, PREPARING);
        icon.innerHTML = '';
        this.timerToReady().then(() => {
            clearInterval(timer);
            icon.innerHTML = '✅';
            readyTime.innerHTML = '';
            setStatus(element.id, DONE);
        });
    }
    /**
     * Show Time to get resources
     * @param {Number} readyTime Time to get resources
     * @returns Returns the timer. You can assign a variable at the call site and stop.
     */
    _showTimerToReady(readyTime) {
        let counter = 0;
        return setInterval(() => {
            counter++;
            readyTime.innerHTML = `🌽 ${this.readyTime - counter}`;
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
        return setInterval(() => {
            counter++;
            foodTimeElement.innerHTML = `🥣 ${this.foodTime - counter}`;
        }, 1000)
    }
    /**
     * Time to end meals
     */
    endOfMealTimer = () => this._getTimer(this.foodTime);
    /**
     * Feed the animal
     * @param {HTMLElement} element 
     * @param setHunger Callback function to set hunger
     */
    eating(element, setHunger) {
        let [icon, readyTime, foodTime] = element.children;
        const timer = this._showEndOfMealTimer(foodTime);
        setHunger(element.id, false);
        icon.innerHTML = '';
        this.endOfMealTimer().then(() => {
            clearInterval(timer);
            icon.innerHTML = '🥣';
            setHunger(element.id, true);
        })
    }
}