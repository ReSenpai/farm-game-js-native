import { GameBoard } from './GameBoard.js';
import { Resources } from './Resources.js';
import { BaseItem, Animal } from './items.js';
import { PlantingMenu } from './PlantingMenu.js';
import { menuSource } from './data.js';
import { WHEAT, COW, EMPTY_CELL, CHICKEN, DONE, HUNGER } from './consts.js';
import { GlobalState } from './store.js';

const plantingMenuSource = {
    [EMPTY_CELL]: 0,
    [WHEAT] : 10,
    [CHICKEN]: 30,
    [COW] : 50
}

class Game {
    constructor(entryPoint) {
        this.entryPoint = entryPoint;
        this.resources = new Resources({ wheats: 0, milks: 0, eggs: 0, golds: 0 });
        this.plantingMenu = new PlantingMenu(plantingMenuSource);
        this.gameBoard = new GameBoard(8, this.entryPoint);
        this.wheat = new BaseItem(WHEAT, 10);
        this.cow = new Animal(COW, 20, 20);
        this.chicken = new Animal(CHICKEN, 10, 30);
        this.itemClasses = [WHEAT, COW, EMPTY_CELL, CHICKEN];
        this.store = new GlobalState();
    }
    showResources() {
        const gameResources = document.getElementById('game-resources');
        this.resources.render(gameResources);
    }
    renderItemMenu() {
        const itemMenu = document.getElementById('item-menu');
        this.plantingMenu.render(itemMenu);
    }
    collectResources(name) {
        this.resources.increaseResource(name,1);
    }

    animalCheck = (item) => (item === CHICKEN || item === COW ) ? true : false;

    generateCellEvent = (cellId) => {
        console.log(cellId)
        const currentCell = document.getElementById(cellId);
        const {currentItem, status, id, hunger} = this.store.cells[cellId];
        const currentMenuOption = this.plantingMenu.currentItem;
        
        if (currentItem !== EMPTY_CELL) {
            if (this.animalCheck(currentMenuOption)) {
                if (hunger) {
                    this[currentItem].eating(currentCell, this.store.setHunger);
                    return;
                }
            }
            if (status === DONE) {   
                this.collectResources(currentItem);
                this[currentItem].plantOnCell(currentCell, this.store.setStatus);
            }
            return;
        }

        currentCell.classList.add(currentMenuOption);
        this.store.setCurrentItem(id, currentMenuOption);

        if (this.animalCheck(currentMenuOption)) {
            currentCell.children[0].innerHTML = '🥣';
            this.store.setHunger(id, true);
        }

        this[currentMenuOption].plantOnCell(currentCell, this.store.setStatus);
    }

    renderGrid() {
        this.gameBoard.render(this.generateCellEvent);
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

