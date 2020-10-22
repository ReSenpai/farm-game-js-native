import { EMPTY, EMPTY_CELL } from "./consts.js";

export class Grid {
    constructor(size = 8, entryPoint) {
        this.size = size;
        this.entryPoint = entryPoint;
        this.cells = {};
    }
    _setCellsState(name) {
        this.cells[name] = {
            currentItem: EMPTY_CELL,
            status: EMPTY
        }
    }
    getCellsState() {
        return this.cells;
    }
    _createCell(index, event) {
        const cell = document.createElement('div');
        const cellName = document.createTextNode(`Клетка ${index + 1}`);
        const cellId = `cell${index + 1}`;

        cell.classList.add('cell');
        cell.classList.add(EMPTY_CELL);
        cell.appendChild(cellName);
        cell.setAttribute("id", cellId);
        cell.addEventListener("click", (e) => event(e.target.id));

        this._setCellsState(cellId);
        return cell;
    }

    renderCells(event) {
        for (let index = 0; index < this.size * this.size; index++) {
            this.entryPoint.appendChild(this._createCell(index, event));
        }
    }
}