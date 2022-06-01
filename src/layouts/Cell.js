import { cssClasses } from "../models/cssClasses.js";

export class Cell {
    constructor() {
        this.element = null;
        this.currentItem = null;
        this.growthTimer = null;
        this._event = () => {};
        this.createCell();
    }

    createCell = () => {
        const cell = document.createElement('div');
        const timers = this._getTimerElements(1)
        const [growthTimer] = timers;

        cell.classList.add(cssClasses.CELL, cssClasses.EMPTY_CELL);
        cell.append(...timers);

        cell.onclick = () => this._event();

        this.growthTimer = growthTimer;
        this.element = cell;
    }

    place = (item) => {
        this.currentItem = item;
        this.element.style.backgroundImage = `url(${item.image})`;
    }

    clear = () => {

    }

    setEvent = (event) => {
        this._event = event;
    }

    startGameTick = () => {
        if (!this.currentItem) {
            return;
        }

        this.currentItem.makeGameTick();
        this.growthTimer.textContent = this.currentItem.timeCounter;
    }

    _getTimerElements = (size) => {
        const timerElement = () => document.createElement('span');
        const result = [];

        for (let index = 0; index < size; index++) {
            result.push(timerElement())
        }

        return result;
    }
} 