import { WHEAT } from "./consts.js";

export class PlantingMenu {
    /**
     * Menu for selecting animals or plants to be placed on a cells
     * @param menuSource Object with animals and plants and their cost
     */
    constructor(menuSource) {
        this.menuSource = menuSource;
        this.currentItem = WHEAT;
    }
    /**
     * Make HTML menu item
     * @param {String} name Menu item name
     * @param event Menu item event function
     */
    _getMenuItem(name, event) {
        const item = document.createElement('div');
        const itemName = document.createTextNode(name);
        item.appendChild(itemName);
        item.setAttribute("id", `menu-${name}`);
        item.addEventListener('click', event);
        return item;
    }
    /**
     * Event switching menus
     * @param e Event object 
     */
    _menuSwitchEvent = (e) => {
        document.getElementById(`menu-${this.currentItem}`).classList.remove('plantingMenu-active');
        this.currentItem = e.target.id.replace(/^menu-/i, '');
        const icon = document.getElementById(e.target.id);
        icon.classList.add('plantingMenu-active');
        console.log(this.currentItem);
    }
    /**
     * Collect a menu item
     * @param {String} name Menu item name
     */
    _collectMenuItem(name) {
        return this._getMenuItem(name, this._menuSwitchEvent);
    }
    /**
     * Render planting menu
     * @param {HTMLElement} locationPoint Where to render planting menu
     */
    render(locationPoint) {
        Object.keys(this.menuSource).forEach(key => {
            const icon = this._collectMenuItem(key);
            icon.classList.add(key, 'plantingMenu');
            locationPoint.appendChild(icon);
        });
    }
}