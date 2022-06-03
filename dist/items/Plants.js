import { TICK_SIZE } from "../core/config.js";
export class Plants {
    constructor({ image, name, growthTime, resourceMultiplier = 1, resourceCost, itemCount, maxResources = 10, }) {
        this.runGrowthTimer = () => {
            this.makeGameTick();
            this.timerID = setInterval(() => {
                this.makeGameTick();
            }, TICK_SIZE);
        };
        this.stopGrowthTimer = () => {
            if (this.timerID) {
                clearInterval();
            }
            this.timerElement = null;
        };
        this.applyWater = () => {
            if (this.waterSaturated) {
                return;
            }
            this.resourceMultiplier = this.resourceMultiplier * 1.2;
            this.waterSaturated = true;
        };
        this.makeGameTick = () => {
            this.updateTimerElement();
            if (this.resourceCounter === this.maxResources) {
                return;
            }
            if (!this.timeCounter) {
                this.timeCounter = this.growthTime;
                this.resourceCounter++;
                return;
            }
            this.timeCounter--;
        };
        this.updateTimerElement = () => {
            if (this.timerElement) {
                this.timerElement.textContent = this.timeCounter.toString();
            }
        };
        this._getTimerElements = (size) => {
            const timerElement = () => document.createElement("span");
            const result = [];
            for (let index = 0; index < size; index++) {
                result.push(timerElement());
            }
            return result;
        };
        // base parameters
        this.image = image;
        this.name = name;
        this.growthTime = growthTime;
        this.resourceMultiplier = resourceMultiplier;
        this.resourceCost = resourceCost;
        this.itemCount = itemCount;
        this.timeCounter = growthTime;
        this.resourceCounter = 0;
        this.maxResources = maxResources;
        this.timerElement = this._getTimerElements(1)[0];
        // statuses
        this.waterSaturated = false;
        // private
        this.timerID = null;
    }
}
