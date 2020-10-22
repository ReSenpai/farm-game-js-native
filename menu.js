import { WHEAT } from "./consts.js";
import { getMenuItemHTML } from "./html_collectors.js";

export class Menu {
    constructor(menuSource = []) {
        this.menuSource = menuSource;
        this.currentItem = WHEAT;
    }
    _event = (e) => {
        this.currentItem = e.target.id.replace(/^menu-/i, '');
    }
    _createMenuItem(name) {
        return getMenuItemHTML(name, this._event);
    }

    renderItemMenu(element) {
        this.menuSource.map(item => {
            element.appendChild(this._createMenuItem(item.name));
        });
    }
}