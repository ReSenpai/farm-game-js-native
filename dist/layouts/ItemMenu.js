import { CssClasses } from "../models/cssClasses.js";
import { ItemID } from "../models/items.js";
export class ItemMenu {
    constructor(plants) {
        this.menuInitialization = () => {
            this.createMenu();
            this.handlePressItem(this.currentItemID, 0);
        };
        this.createMenu = () => {
            const menuItemsWrapper = document.createElement("div");
            this.menu.classList.add(CssClasses.GAME_BAR);
            menuItemsWrapper.classList.add(CssClasses.MENU_ITEMS_WRAPPER);
            this.setupItemDescriptionElement();
            this.collectMenuItems();
            menuItemsWrapper.append(...this.menuItemsElements);
            this.menu.append(this.itemDescriptionElement.wrapper, menuItemsWrapper);
        };
        this.collectMenuItems = () => {
            this.menuItemsElements = this.plants.map((plant, index) => {
                const element = document.createElement("div");
                element.classList.add(CssClasses.MENU_ITEM);
                element.style.backgroundImage = `url(${plant.image})`;
                element.onclick = () => this.handlePressItem(plant.id, index);
                return element;
            });
        };
        this.handlePressItem = (itemID, index) => {
            this.currentItemID = itemID;
            this.onChangeItemMenu(itemID);
            this.menuItemsElements.forEach((element, i) => {
                if (i === index) {
                    const { name, image, text } = this.itemDescriptionElement;
                    const currentItem = this.plants[i];
                    element.classList.add("plantingMenu-active");
                    name.textContent = currentItem.name;
                    image.src = currentItem.artImage;
                    text.textContent = currentItem.description;
                }
                else {
                    element.classList.remove("plantingMenu-active");
                }
            });
        };
        this.setupItemDescriptionElement = () => {
            const { wrapper, image, name, text } = this.itemDescriptionElement;
            wrapper.classList.add(CssClasses.ITEM_DESCRIPTION_WRAPPER);
            name.classList.add(CssClasses.ITEM_DESCRIPTION_NAME);
            image.classList.add(CssClasses.ITEM_DESCRIPTION_IMAGE);
            text.classList.add(CssClasses.ITEM_DESCRIPTION_TEXT);
            wrapper.append(name, image, text);
        };
        this.menu = document.createElement("div");
        this.currentItemID = ItemID.Wheat;
        this.onChangeItemMenu = () => { };
        this.plants = plants;
        this.menuItemsElements = [];
        this.itemDescriptionElement = {
            wrapper: document.createElement("div"),
            name: document.createElement("h2"),
            image: document.createElement("img"),
            text: document.createElement("p"),
        };
    }
}
