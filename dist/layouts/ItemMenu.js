import { CssClasses } from "../models/cssClasses.js";
export class ItemMenu {
    constructor() {
        this.createMenu = () => {
            this.element.classList.add(CssClasses.GAME_BAR);
        };
        this.element = document.createElement("div");
        this.createMenu();
    }
}
