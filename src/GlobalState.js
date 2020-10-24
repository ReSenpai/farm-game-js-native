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
     * Set status
     * @param {String} id Cell id
     * @param {String} status Current status
     */
    setStatus = (id, status) => {
        this.cells[id].status = status;
    }
    /**
     * Set hunger (Boolean)
     * @param {String} id Cell id
     * @param {boolean} hungerStatus  Boolean
     */
    setHunger = (id, hungerStatus) => {
        this.cells[id].hunger = hungerStatus;
    }
}