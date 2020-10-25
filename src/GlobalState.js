export class GlobalState {
    /**
     * Global state manager
     */
    constructor () {
        this.cells = {};
    }
    /**
     * Set a cells state object
     * @param cellsState Cells state
     */
    setCells(cellsState) {
        this.cells = cellsState;
    }
    /**
     * Set the current item on the cell
     * @param {String} id Cell id
     * @param {String} item Current item
     */
    setCurrentItem(id, item) {
        this.cells[id].currentItem = item;
    }
    /**
     * Get the current item
     * @param {String} id Cell id
     */
    getCurrentItem = (id) => this.cells[id].currentItem;
    /**
     * Set status
     * @param {String} id Cell id
     * @param {String} status Current status
     */
    setStatus = (id, status) => {
        this.cells[id].status = status;
    }
    /**
     * Get status
     * @param {String } id Cell id
     */
    getStatus = (id) => this.cells[id].status;
    /**
     * Set hunger (Boolean)
     * @param {String} id Cell id
     * @param {boolean} hungerStatus  Boolean
     */
    setHunger = (id, hungerStatus) => {
        this.cells[id].hunger = hungerStatus;
    }
    /**
     * Get hunger status
     * @param {String} id Cell id
     */
    getHungerStatus = (id) => this.cells[id].hunger;
    /**
     * Increase the resource on the cell
     * @param {String} id Cell id
     * @param {Number} value What is the value of increasing?
     */
    increaseResource = (id, value) => {
        this.cells[id].resource += value;
    }
    /**
     * Reset resources by 0
     * @param {String} id Cell id
     */
    resetResource = (id) => {
        this.cells[id].resource = 0;
    }
    /**
     * Get the current resource value on the cell
     * @param {String} id Cell id
     */
    getResource = (id) => this.cells[id].resource;
}