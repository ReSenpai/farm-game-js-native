import { TICK_SIZE } from "../core/config.js";

interface IPlants {
  image: string;
  name: string;
  growthTime: number;
  resourceCost: number;
  itemCount: number;
  resourceMultiplier?: number;
  maxResources?: number;
}

export class Plants {
  public image: string;
  public name: string;
  public growthTime: number;
  public resourceMultiplier: number;
  public resourceCost: number;
  public itemCount: number;
  public timeCounter: number;
  public resourceCounter: number;
  public maxResources: number;
  public timerElement: HTMLSpanElement | null;
  public waterSaturated: boolean;
  private timerID: number | null;

  constructor({
    image,
    name,
    growthTime,
    resourceMultiplier = 1,
    resourceCost,
    itemCount,
    maxResources = 10,
  }: IPlants) {
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

  runGrowthTimer = (): void => {
    this.makeGameTick();
    this.timerID = setInterval(() => {
      this.makeGameTick();
    }, TICK_SIZE);
  };

  stopGrowthTimer = (): void => {
    if (this.timerID) {
      clearInterval();
    }
    this.timerElement = null;
  };

  applyWater = (): void => {
    if (this.waterSaturated) {
      return;
    }

    this.resourceMultiplier = this.resourceMultiplier * 1.2;
    this.waterSaturated = true;
  };

  makeGameTick = (): void => {
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
    if (this.timerElement) {
      this.timerElement.textContent = this.timeCounter.toString();
    }
  };

  _getTimerElements = (size: number): HTMLSpanElement[] => {
    const timerElement = () => document.createElement("span");
    const result = [];

    for (let index = 0; index < size; index++) {
      result.push(timerElement());
    }

    return result;
  };
}
