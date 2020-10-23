import { CHICKEN, COW, EGGS, GOLDS, MILKS, WHEAT, WHEATS } from "./consts.js";

export class Resources {
    /**
     * Manipulating and displaying the game's resources
     * @param resources An object with resources and their default values. For example: {golds: 100}
     */
    constructor(resources) {
        this.resources = resources;
    }
    /**
     * Collect the name and value of resources
     * @param {String} name 
     */
    _getResourceName(name) {
        return `${name} : ${this.resources[name]}`;
    }
    /**
     * Sell resources for gold
     * @param {String} name The name of the resource for sale
     */
    sellResources = (name) => {
        const currentResourceValue = this.resources[name];
        this.resources[name] = 0;
        this.increaseResource(GOLDS, currentResourceValue);
        this.updateResource(name);
    }
    /**
     * Create an HTML resource element
     * @param {String} name  resource name
     * @returns HTML resource element
     */
    _getResourceItem(name) {
        const item = document.createElement('div');
        const itemName = document.createTextNode(this._getResourceName(name));
        item.appendChild(itemName);
        item.setAttribute("id", `resource-${name}`);
        if (name === EGGS || name === MILKS) {
            item.addEventListener('click', () => this.sellResources(name));
        }
        return item;
    }
    /**
     * Render resources
     * @param {HTMLElement} locationPoint Where to render resources
     */
    render(locationPoint) {
        Object.keys(this.resources).forEach(name => {
            locationPoint.appendChild(this._getResourceItem(name));
        });
    }
    /**
     * See the current state of the resource
     * @param {String} name Resource name
     */
    updateResource(name) {
        const resource = document.getElementById(`resource-${name}`);
        resource.innerHTML = this._getResourceName(name);
    }
    /**
     * Increase the resource by the specified value
     * @param {String} name Resource name
     * @param {Number} value What's the value of increasing your resource
     */
    increaseResource(name, value) {
        const сonverter = {
            [WHEAT]: WHEATS,
            [CHICKEN]: EGGS,
            [COW]: MILKS,
            [GOLDS]: GOLDS
        }
        const resourceName = сonverter[name];
        this.resources[resourceName] += value;
        this.updateResource(resourceName);
    }
}