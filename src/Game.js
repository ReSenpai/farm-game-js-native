import { GameBoard } from './GameBoard.js';
import { Resources } from './Resources.js';
import { Animal, Plants } from './Items.js';
import { PlantingMenu } from './PlantingMenu.js';
import { WHEAT, COW, EMPTY_CELL, CHICKEN, DONE } from './consts.js';
import { GlobalState } from './GlobalState.js';

const plantingMenuSource = {
    [EMPTY_CELL]: 0,
    [WHEAT] : 10,
    [CHICKEN]: 30,
    [COW] : 50
}

class Game {
    /**
     * Build the game
     * @param {HTMLElement} locationPoint Where to render Game
     */
    constructor(locationPoint) {
        this.locationPoint = locationPoint;
        this.resources = new Resources({ wheats: 0, milks: 0, eggs: 0, golds: 30 });
        this.plantingMenu = new PlantingMenu(plantingMenuSource);
        this.gameBoard = new GameBoard(8, this.locationPoint);
        this.wheat = new Plants(WHEAT, 10);
        this.cow = new Animal(COW, 20, 20);
        this.chicken = new Animal(CHICKEN, 10, 30);
        this.itemClasses = [WHEAT, COW, EMPTY_CELL, CHICKEN];
        this.store = new GlobalState();
    }
    /**
     * Render game resources
     */
    renderResources() {
        const gameResources = document.getElementById('game-resources');
        this.resources.render(gameResources);
    }
    /**
     * Render planting menu
     */
    renderPlantingMenu() {
        const itemMenu = document.getElementById('item-menu');
        this.plantingMenu.render(itemMenu);
    }
    /**
     * Сollect resources from the cell
     * @param {String} name Resource name
     */
    collectResources(name) {
        this.resources.increaseResource(name,1);
    }
    /**
     * Check animal on cell
     * @param {String} item current menu option
     */
    animalCheck = (item) => (item === CHICKEN || item === COW ) ? true : false;
    /**
     * Game logic
     * @param {String} cellId Cell id
     */
    gameCore = (cellId) => {
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
    /**
     * Render game board
     */
    renderGameBoard() {
        this.gameBoard.render(this.gameCore);
        this.store.setCells(this.gameBoard.getCellsState());
        console.log(this.store.cells);
    }
    /**
     * Start the game
     */
    start() {
        this.renderGameBoard();
        this.renderResources();
        this.renderPlantingMenu();
    }
}


const launchPoint = document.getElementById('game-board');
const game = new Game(launchPoint);
game.start();

