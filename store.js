export class GlobalState {
    constructor () {
        this.cells = {};
    }
    setCells(cellsState) {
        this.cells = cellsState;
    }
}