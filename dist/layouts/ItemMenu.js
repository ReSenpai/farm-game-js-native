import { CssClasses } from "../models/cssClasses.js";
import { ItemID } from "../models/items.js";
export class ItemMenu {
    constructor(plants) {
        this.createMenu = () => {
            this.menu.classList.add(CssClasses.GAME_BAR);
            this.collectMenuItems();
            this.menu.append(...this.menuItemsElements);
        };
        this.collectMenuItems = () => {
            this.menuItemsElements = this.plants.map((plant, index) => {
                const element = document.createElement("div");
                element.classList.add(CssClasses.MENU_ITEM);
                element.style.backgroundImage = `url(${plant.image})`;
                element.textContent = plant.name;
                element.onclick = () => this.handlePressItem(plant.id, index);
                return element;
            });
        };
        this.handlePressItem = (itemID, index) => {
            this.currentItemID = itemID;
            this.onChangeItemMenu(itemID);
            this.menuItemsElements.forEach((element, i) => {
                if (i === index) {
                    element.classList.add("plantingMenu-active");
                }
                else {
                    element.classList.remove("plantingMenu-active");
                }
            });
        };
        this.menu = document.createElement("div");
        this.currentItemID = ItemID.Rice;
        this.onChangeItemMenu = () => { };
        this.plants = plants;
        this.menuItemsElements = [];
        this.createMenu();
    }
}
