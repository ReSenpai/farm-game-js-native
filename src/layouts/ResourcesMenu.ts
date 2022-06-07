import { CssClasses } from "../models/cssClasses.js";

export class ResourcesMenu {
  public menu: HTMLDivElement;
  private gold: number;
  private goldElement: HTMLSpanElement;

  constructor() {
    this.gold = 0;
    this.menu = document.createElement("div");
    this.goldElement = document.createElement("span");
    this.createMenu();
  }

  public addGold = (value: number) => {
    this.gold += value;
    this.updateResourcesElements();
  };

  public writeOffGold = (value: number) => {
    if (this.gold - value >= 0) {
      this.gold -= value;
      return true;
    }

    return false;
  };

  private createMenu = (): void => {
    this.menu.classList.add(CssClasses.GAME_BAR);
    this.setupResourcesElements();
    this.menu.append(this.goldElement);
  };

  private setupResourcesElements = () => {
    this.goldElement.textContent = `💰 ${this.gold}`;

    this.goldElement.classList.add(CssClasses.RESOURCE_ITEM);
  };

  private updateResourcesElements = () => {
    this.goldElement.textContent = `💰 ${this.gold}`;
  }
}
