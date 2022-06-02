import { TICK_SIZE } from "../core/config.js";

export class Plants {
  constructor({
    image,
    name,
    growthTime,
    resourceMultiplier = 1,
    resourceCost,
    itemCount,
    maxResources = 10,
  }) {
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
    this._timerID = null;
  }

  runGrowthTimer = () => {
    this.makeGameTick();
    this._timerID = setInterval(() => {
      this.makeGameTick();
    }, TICK_SIZE);
  };

  stopGrowthTimer = () => {
    clearInterval(this._timerID);
    this.timerElement = null;
  };

  applyWater = () => {
    if (this.waterSaturated) {
      return;
    }

    this.resourceMultiplier = this.resourceMultiplier * 1.2;
    this.waterSaturated = true;
  };

  makeGameTick = () => {
    console.log('plants tick');
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

  updateTimerElement = () => {
    this.timerElement.textContent = this.timeCounter;
  }

  _getTimerElements = (size) => {
    const timerElement = () => document.createElement("span");
    const result = [];

    for (let index = 0; index < size; index++) {
      result.push(timerElement());
    }

    return result;
  };
}
