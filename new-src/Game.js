import { Cell } from './Cell.js';
import { GAMEBOARD_SIZE_X, GAMEBOARD_SIZE_Y } from './consts.js';

class Game {
    constructor(locationPoint) {
        this.locationPoint = locationPoint;
        this.cells = this.createCellArray(GAMEBOARD_SIZE_X * GAMEBOARD_SIZE_Y);
    }

    createCellArray(size) {
        let array = [];
        for (let index = 0; index < size; index++) {
            array.push(new Cell(index + 1));
        }
        return array;
    }

    render() {
        this.cells.forEach(cell => {
            this.locationPoint.appendChild(cell.element);
        });
    }

    start() {
        this.render();
        /**
         * 
         */
    }
}

const launchPoint = document.getElementById('game-board');
const game = new Game(launchPoint);
game.start();