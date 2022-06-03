import { CssClasses } from "../models/cssClasses.js";

export class ItemMenu {
  public element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.createMenu();
  }

  createMenu = (): void => {
    this.element.classList.add(CssClasses.GAME_BAR);
  };
}
