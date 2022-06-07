import { GameBoard } from "../layouts/GameBoard.js";
import { ItemMenu } from "../layouts/ItemMenu.js";
import { Plants } from "../items/Plants.js";

import { CssClasses } from "../models/cssClasses.js";
import { BOARD_SIZE } from "./config.js";

import { plants } from "../data/plants.js";
import { ItemID, IPlantsProps } from "../models/items.js";

export class Engine {
  protected root: HTMLElement | null;
  protected board: GameBoard;
  protected itemMenu: ItemMenu;
  private boardLayout: HTMLDivElement;
  private plants: IPlantsProps[];

  constructor(root: HTMLElement | null) {
    this.root = root;
    this.plants = plants;
    this.board = new GameBoard(BOARD_SIZE);
    this.itemMenu = new ItemMenu(this.plants);
    this.boardLayout = document.createElement("div");
  }

  public start = (): void => {
    this.render();
    this.eventInitialization();
  };

  private render = (): void => {
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

  private eventInitialization = () => {
    this.itemMenu.onChangeItemMenu = this.handleChangeItemMenu;
  }

  public handleChangeItemMenu = (id: ItemID) => {
    this.board.changeItemMenu(id)
  }
}
