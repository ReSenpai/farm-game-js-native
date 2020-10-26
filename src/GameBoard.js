import { EMPTY, EMPTY_CELL } from "./consts.js";

export class GameBoard {
    /**
     * Generation of the playing field
     * @param {Number} size The size of the game grid, one number. For example, the size of the 8 will be equal to a grid of 8x8.
     * @param {HTMLElement} locationPoint Where to render playing field
     */
    constructor(size = 8, locationPoint) {
        this.size = size;
        this.locationPoint = locationPoint;
        this.cells = {};
    }
    /**
     * Create a base object with a state for the cell
     * @param {String} key cell id
     */
    _setCellsState(key) {
        this.cells[key] = {
            id: key,
            currentItem: EMPTY_CELL,
            status: EMPTY,
            hunger: false,
            resource: 0
        }
    }
    /**
     * Get the whole state of the cells
     * @returns object with cell states
     */
    getCellsState = () => this.cells;
    /**
     * Creating an HTML cell element
     * @param {Number} index Cell number
     * @param {CallableFunction} event Cell Event
     * @returns Cell HTML element
     */
    _createCell(index, event) {
        const cell = document.createElement('div');
        const timerElement = () => document.createElement('span');
        const cellId = `cell${index + 1}`;

        cell.classList.add('cell');
        cell.classList.add(EMPTY_CELL); // delete ?

        for (let index = 0; index < 4; index++) {
            cell.appendChild(timerElement());  
        }
        
        cell.setAttribute("id", cellId);
        cell.onclick = () => event(cellId);

        this._setCellsState(cellId);
        return cell;
    }
    /**
     * Render of all cells on the game board
     * @param {CallableFunction} event Cell Event
     */
    render(event) {
        for (let index = 0; index < this.size * this.size; index++) {
            this.locationPoint.appendChild(this._createCell(index, event));
        }
    }
}