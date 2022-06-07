import { GameBoard } from "../layouts/GameBoard.js";
import { ItemMenu } from "../layouts/ItemMenu.js";
import { CssClasses } from "../models/cssClasses.js";
import { BOARD_SIZE } from "./config.js";
import { plants } from "../data/plants.js";
export class Engine {
    constructor(root) {
        this.start = () => {
            this.render();
            this.eventInitialization();
        };
        this.render = () => {
            if (!this.root) {
                return console.warn("No root element specified for the game render");
            }
            this.root.classList.add(CssClasses.CONTAINER);
            this.boardLayout.classList.add(CssClasses.GAME_BOARD);
            this.boardLayout.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 1fr)`;
            this.boardLayout.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;
            this.boardLayout.append(...this.board.elements);
            this.root.append(this.boardLayout, this.itemMenu.menu);
        };
        this.eventInitialization = () => {
            this.itemMenu.onChangeItemMenu = this.handleChangeItemMenu;
        };
        this.handleChangeItemMenu = (id) => {
            this.board.changeItemMenu(id);
        };
        this.root = root;
        this.plants = plants;
        this.board = new GameBoard(BOARD_SIZE);
        this.itemMenu = new ItemMenu(this.plants);
        this.boardLayout = document.createElement("div");
    }
}
