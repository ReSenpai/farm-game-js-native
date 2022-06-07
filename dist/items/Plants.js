import { TICK_SIZE } from "../core/config.js";
export class Plants {
    constructor({ id, image, name, growthTime, resourceMultiplier = 1, resourceCost, itemCount, maxResources = 10, }) {
        this.runGrowthTimer = () => {
            this.makeGameTick();
            this.timerID = setInterval(() => {
                this.makeGameTick();
            }, TICK_SIZE);
        };
        this.clear = () => {
            if (this.timerID) {
                clearInterval(this.timerID);
            }
        };
        this.applyWater = () => {
            if (this.waterSaturated) {
                return;
            }
            this.resourceMultiplier = this.resourceMultiplier * 1.2;
            this.waterSaturated = true;
        };
        this.makeGameTick = () => {
            this.updateElements();
            if (this.oldResourceCounter === this.maxResources) {
                return;
            }
            if (!this.timeCounter) {
                this.timeCounter = this.growthTime;
                this.currentResourceCounter++;
                return;
            }
            this.timeCounter--;
        };
        this.updateElements = () => {
            const [timerElements, resourceCountElement] = this.itemElements;
            if (timerElements) {
                timerElements.textContent = `⏱ ${this.timeCounter}`;
            }
            console.log(resourceCountElement);
            console.log(this.oldResourceCounter === 0 ||
                this.oldResourceCounter !== this.currentResourceCounter);
            if (resourceCountElement &&
                (this.oldResourceCounter === 0 ||
                    this.oldResourceCounter !== this.currentResourceCounter)) {
                this.oldResourceCounter = this.currentResourceCounter;
                resourceCountElement.textContent = `🧱 ${this.oldResourceCounter}`;
            }
        };
        this.setupElements = () => {
            const [timerElements, resourceCountElement] = this.getTimerElements(2);
            timerElements.classList.add('itemCount');
            resourceCountElement.classList.add('itemCount');
            this.itemElements.push(timerElements, resourceCountElement);
        };
        this.getTimerElements = (size) => {
            const timerElement = () => document.createElement("span");
            const result = [];
            for (let index = 0; index < size; index++) {
                result.push(timerElement());
            }
            return result;
        };
        // base parameters
        this.id = id;
        this.image = image;
        this.name = name;
        this.growthTime = growthTime;
        this.resourceMultiplier = resourceMultiplier;
        this.resourceCost = resourceCost;
        this.itemCount = itemCount;
        this.timeCounter = growthTime;
        this.oldResourceCounter = 0;
        this.currentResourceCounter = 0;
        this.maxResources = maxResources;
        this.itemElements = [];
        // statuses
        this.waterSaturated = false;
        // private
        this.timerID = null;
        this.setupElements();
    }
}
