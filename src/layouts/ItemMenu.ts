import { CssClasses } from "../models/cssClasses.js";
import { ItemID, IPlantsProps } from "../models/items.js";

export class ItemMenu {
  public menu: HTMLDivElement;
  public currentItemID: ItemID;
  public onChangeItemMenu: (id: ItemID) => void;
  private plants: IPlantsProps[];
  private menuItemsElements: HTMLDivElement[];

  constructor(plants: IPlantsProps[]) {
    this.menu = document.createElement("div");
    this.currentItemID = ItemID.Rice;
    this.onChangeItemMenu = () => {};
    this.plants = plants;
    this.menuItemsElements = [];
    this.createMenu();
  }

  private createMenu = (): void => {
    this.menu.classList.add(CssClasses.GAME_BAR);
    this.collectMenuItems();
    this.menu.append(...this.menuItemsElements);
  };

  private collectMenuItems = (): void => {
    this.menuItemsElements = this.plants.map((plant, index) => {
      const element = document.createElement("div");
      element.classList.add(CssClasses.MENU_ITEM);
      element.style.backgroundImage = `url(${plant.image})`;
      element.textContent = plant.name;
      element.onclick = () => this.handlePressItem(plant.id, index);
      return element;
    });
  };

  private handlePressItem = (itemID: ItemID, index: number): void => {
    this.currentItemID = itemID;
    this.onChangeItemMenu(itemID);
    this.menuItemsElements.forEach((element, i) => {
      if (i === index) {
        element.classList.add("plantingMenu-active");
      } else {
        element.classList.remove("plantingMenu-active");
      }
    });
  };
}
