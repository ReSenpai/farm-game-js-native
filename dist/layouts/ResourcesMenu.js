import { CssClasses } from "../models/cssClasses.js";
export class ResourcesMenu {
    constructor() {
        this.addGold = (value) => {
            this.gold += value;
            this.updateResourcesElements();
        };
        this.writeOffGold = (value) => {
            if (this.gold - value >= 0) {
                this.gold -= value;
                return true;
            }
            return false;
        };
        this.createMenu = () => {
            this.menu.classList.add(CssClasses.GAME_BAR);
            this.setupResourcesElements();
            this.menu.append(this.goldElement);
        };
        this.setupResourcesElements = () => {
            this.goldElement.textContent = `💰 ${this.gold}`;
            this.goldElement.classList.add(CssClasses.RESOURCE_ITEM);
        };
        this.updateResourcesElements = () => {
            this.goldElement.textContent = `💰 ${this.gold}`;
        };
        this.gold = 0;
        this.menu = document.createElement("div");
        this.goldElement = document.createElement("span");
        this.createMenu();
    }
}
