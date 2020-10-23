export class GlobalState {
    constructor () {
        this.cells = {};
    }
    setCells(cellsState) {
        this.cells = cellsState;
    }
    setCurrentItem(id, item) {
        this.cells[id].currentItem = item;
    }
    setStatus = (id, status) => {
        this.cells[id].status = status;
    }
    setHunger = (id, hungerStatus) => {
        this.cells[id].hunger = hungerStatus;
    }
}