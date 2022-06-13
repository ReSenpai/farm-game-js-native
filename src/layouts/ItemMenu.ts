import { CssClasses } from "../models/cssClasses.js";
import { ItemID, IPlantsProps } from "../models/items.js";

export class ItemMenu {
  public menu: HTMLDivElement;
  public currentItemID: ItemID;
  public onChangeItemMenu: (id: ItemID) => void;
  private plants: IPlantsProps[];
  private menuItemsElements: HTMLDivElement[];
  private itemDescriptionElement: {
    wrapper: HTMLDivElement;
    name: HTMLHeadingElement;
    image: HTMLImageElement;
    text: HTMLParagraphElement;
  };

  constructor(plants: IPlantsProps[]) {
    this.menu = document.createElement("div");
    this.currentItemID = ItemID.Wheat;
    this.onChangeItemMenu = () => {};
    this.plants = plants;
    this.menuItemsElements = [];
    this.itemDescriptionElement = {
      wrapper: document.createElement("div"),
      name: document.createElement("h2"),
      image: document.createElement("img"),
      text: document.createElement("p"),
    };
  }

  public menuInitialization = () => {
    this.createMenu();
    this.handlePressItem(this.currentItemID, 0);
  };

  private createMenu = (): void => {
    const menuItemsWrapper = document.createElement("div");

    this.menu.classList.add(CssClasses.GAME_BAR);
    menuItemsWrapper.classList.add(CssClasses.MENU_ITEMS_WRAPPER);

    this.setupItemDescriptionElement();
    this.collectMenuItems();

    menuItemsWrapper.append(...this.menuItemsElements);
    this.menu.append(this.itemDescriptionElement.wrapper, menuItemsWrapper);
  };

  private collectMenuItems = (): void => {
    this.menuItemsElements = this.plants.map((plant, index) => {
      const element = document.createElement("div");
      element.classList.add(CssClasses.MENU_ITEM);
      element.style.backgroundImage = `url(${plant.image})`;
      element.onclick = () => this.handlePressItem(plant.id, index);
      return element;
    });
  };

  private handlePressItem = (itemID: ItemID, index: number): void => {
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
      } else {
        element.classList.remove("plantingMenu-active");
      }
    });
  };

  private setupItemDescriptionElement = (): void => {
    const { wrapper, image, name, text } = this.itemDescriptionElement;

    wrapper.classList.add(CssClasses.ITEM_DESCRIPTION_WRAPPER);
    name.classList.add(CssClasses.ITEM_DESCRIPTION_NAME);
    image.classList.add(CssClasses.ITEM_DESCRIPTION_IMAGE);
    text.classList.add(CssClasses.ITEM_DESCRIPTION_TEXT);

    wrapper.append(name, image, text);
  };
}
