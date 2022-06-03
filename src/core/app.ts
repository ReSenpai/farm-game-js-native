import { GameBoard } from "../layouts/GameBoard.js";
import { ItemMenu } from "../layouts/ItemMenu.js";
import { BOARD_SIZE } from "./config.js";
import { CssClasses } from "../models/cssClasses.js";

const board = new GameBoard(BOARD_SIZE);
const itemMenu = new ItemMenu();
const launchPoint = document.getElementById("root");
const boardLayout = document.createElement("div");

if (launchPoint) {
  launchPoint.classList.add(CssClasses.CONTAINER);
  boardLayout.classList.add(CssClasses.GAME_BOARD);

  boardLayout.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 1fr)`;
  boardLayout.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

  boardLayout.append(...board.elements);
  launchPoint.append(boardLayout, itemMenu.element);

  board.cellsInstances[0].plant()

  board.startGameTicker();
}
