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
     * Collect the value of resources
     * @param {String} name 
     */
    _getResourceValue(name) {
        return ` : ${this.resources[name]}`;
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
     * Are these animal resources?
     * @param {String} name resource name
     */
    isAnimalResource = (name) => (name === EGGS || name === MILKS) ? true : false;
    /**
     * Create an HTML resource element
     * @param {String} name  resource name
     * @returns HTML resource element
     */
    _getResourceElement(name) {
        const wrapper = document.createElement('div');
        const icon = document.createElement('div');
        const value = document.createElement('span');
        const button = document.createElement('button');

        icon.classList.add('resource-icon', name);
        value.innerHTML = this._getResourceValue(name);
        wrapper.setAttribute("id", `resource-${name}`);
        button.innerHTML = 'Sell';

        wrapper.appendChild(icon);
        wrapper.appendChild(value);

        if (this.isAnimalResource(name)) {
            button.addEventListener('click', () => this.sellResources(name));
            wrapper.appendChild(button);
        }

        wrapper.classList.add('resources-wrapper');
        return wrapper;
    }
    /**
     * Render resources
     * @param {HTMLElement} locationPoint Where to render resources
     */
    render(locationPoint) {
        Object.keys(this.resources).forEach(name => {
            locationPoint.appendChild(this._getResourceElement(name));
        });
    }
    /**
     * See the current state of the resource
     * @param {String} name Resource name
     */
    updateResource(name) {
        const resource = document.querySelector(`#resource-${name} > span`);
        resource.innerHTML = this._getResourceValue(name);
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
    /**
     * Reduce resource value
     * @param {String} name Resource name
     * @param {Number} value Resource value
     */
    reduceResource(name, value) {
        this.resources[name] -= value;
        this.updateResource(name);
    }
    /**
     * Get resource value
     * @param {String} name Resource name
     */
    getResource = (name) => this.resources[name];
}