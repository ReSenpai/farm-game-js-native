import { TICK_SIZE } from "../core/config.js";
import { IPlantsProps, ItemID } from "../models/items.js";

export class Plants {
  public id: ItemID;
  public image: string;
  public artImage: string;
  public name: string;
  public description: string;
  public growthTime: number;
  public resourceMultiplier: number;
  public resourceCost: number;
  public itemCount: number;
  public timeCounter: number;
  public currentResourceCounter: number;
  public oldResourceCounter: number;
  public maxResources: number;
  public itemElements: HTMLSpanElement[];
  public waterSaturated: boolean;
  private timerID: number | null;

  constructor({
    id,
    image,
    artImage,
    name,
    description,
    growthTime,
    resourceMultiplier = 1,
    resourceCost,
    itemCount,
    maxResources = 10,
  }: IPlantsProps) {
    // base parameters
    this.id = id;
    this.image = image;
    this.artImage = artImage
    this.name = name;
    this.description = description;
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

  public runGrowthTimer = (): void => {
    this.makeGameTick();
    this.timerID = setInterval(() => {
      this.makeGameTick();
    }, TICK_SIZE);
  };

  public clear = (): void => {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  };

  public applyWater = (): void => {
    if (this.waterSaturated) {
      return;
    }

    this.resourceMultiplier = this.resourceMultiplier * 1.2;
    this.waterSaturated = true;
  };

  public collectResources = (): number => {
    let currentResources = this.oldResourceCounter;

    if (this.oldResourceCounter > 0) {
      this.oldResourceCounter = 0;
      this.currentResourceCounter = 0;
      this.itemElements[1].textContent = `🧱 ${this.oldResourceCounter}`;
    }

    return currentResources;
  };

  public makeGameTick = (): void => {
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

  public updateElements = () => {
    const [timerElements, resourceCountElement] = this.itemElements;

    if (timerElements) {
      timerElements.textContent = `⏱ ${this.timeCounter}`;
    }

    if (
      resourceCountElement &&
      (this.oldResourceCounter === 0 ||
        this.oldResourceCounter !== this.currentResourceCounter)
    ) {
      this.oldResourceCounter = this.currentResourceCounter;
      resourceCountElement.textContent = `🧱 ${this.oldResourceCounter}`;
    }
  };

  private setupElements = () => {
    const [timerElements, resourceCountElement] = this.getTimerElements(2);
    timerElements.classList.add("itemCount");
    resourceCountElement.classList.add("itemCount");

    this.itemElements.push(timerElements, resourceCountElement);
  };

  private getTimerElements = (size: number): HTMLSpanElement[] => {
    const timerElement = () => document.createElement("span");
    const result = [];

    for (let index = 0; index < size; index++) {
      result.push(timerElement());
    }

    return result;
  };
}
