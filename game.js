import { Grid } from './grid.js';
import { Resources } from './resources.js';
import { BaseItem, Animal } from './items.js';
import { Menu } from './menu.js';
import { menuSource } from './data.js';
import { WHEAT, COW, EMPTY_CELL, CHICKEN } from './consts.js';
import { GlobalState } from './store.js';

class Game {
    constructor(entryPoint) {
        this.entryPoint = entryPoint;
        this.resources = new Resources({ wheats: 0, milks: 0, eggs: 0, golds: 0 });
        this.menu = new Menu(menuSource);
        this.gameBoard = new Grid(8, this.entryPoint);
        this.wheat = new BaseItem('Wheat', 10);
        this.cow = new Animal('Cow', 20, 20);
        this.chicken = new Animal('Chicken', 10, 30);
        this.itemClasses = [WHEAT, COW, EMPTY_CELL, CHICKEN];
        this.store = new GlobalState();
    }
    showResources() {
        const gameResources = document.getElementById('game-resources');
        this.resources.renderResourceStats(gameResources);
    }
    renderItemMenu() {
        const itemMenu = document.getElementById('item-menu');
        this.menu.renderItemMenu(itemMenu);
    }
    collectResources(name) {
        this.resources.increase(name,1);
    }
    getCurrentClass(currentCell) {
        let currentClass = '';
        this.itemClasses.forEach(item => {
            if (currentCell.classList.contains(item)) {
                currentClass = item;
                return;
            }
        })
        return currentClass;
    }

    readyCheck(currentCell, currentClass) {
        if (currentCell.classList.contains('done')) {   
            this[currentClass].startTimer(currentCell);
            this.collectResources(currentClass);
            currentCell.classList.remove('done');
        }
    }

    generateCellEvent = (cellId) => {
        const currentCell = this.wheat.getCell(cellId);
        const currentMenuOption = this.menu.currentItem;
        const itemClasses = [...this.itemClasses];
        const currentClass = this.getCurrentClass(currentCell);
        console.log(currentClass)

        if (!currentCell.classList.contains(EMPTY_CELL)) {
            this.readyCheck(currentCell, currentClass);
            return;
        }

        currentCell.classList.remove(EMPTY_CELL);

        const switchItemOnCell = (className) => {
            currentCell.classList.remove(...itemClasses);
            currentCell.classList.add(className);
        }

       

        switch(currentMenuOption) {
            case EMPTY_CELL: {
                switchItemOnCell(EMPTY_CELL);
                break;
            }
            case WHEAT: {
                switchItemOnCell(WHEAT);
                break;
            }
            case COW: {
                switchItemOnCell(COW);
                break;
            }
            case CHICKEN: {
                switchItemOnCell(CHICKEN);
                break;
            }
            default:
                return;
        }

        currentCell.classList.add(currentClass);
        currentCell.innerHTML = this[currentMenuOption].name;
        this[currentMenuOption].startTimer(currentCell);
    }


    renderGrid() {
        this.gameBoard.renderCells(this.generateCellEvent);
        this.store.setCells(this.gameBoard.getCellsState());
        console.log(this.store.cells);
    }
    start() {
        this.renderGrid();
        this.showResources();
        this.renderItemMenu();
    }
}


const gameBoard = document.getElementById('game-board');
const game = new Game(gameBoard);
game.start();

