import { DONE, HUNGER, PREPARING, SATIETY } from "./consts.js";

export class BaseItem {
    constructor(name, readyTime) {
        this.name = name;
        this.readyTime = readyTime;
    }
    getCell(cellId) {
        return document.getElementById(cellId); 
    }
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
    _showTimerToReady(readyTime) {
        let counter = 0;
        return setInterval(() => {
            counter++;
            readyTime.innerHTML = `🌽 ${this.readyTime - counter}`;
        }, 1000);
    }
    _getTimer(value) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, value * 1000)
        });
    }
    timerToReady = () => this._getTimer(this.readyTime);
}

export class Animal extends BaseItem {
    constructor(name, readyTime, foodTime) {
        super(name, readyTime);
        this.foodTime = foodTime;
    }
    _showEndOfMealTimer(foodTimeElement) {
        let counter = 0;
        return setInterval(() => {
            counter++;
            foodTimeElement.innerHTML = `🥣 ${this.foodTime - counter}`;
        }, 1000)
    }
    endOfMealTimer = () => this._getTimer(this.foodTime);
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