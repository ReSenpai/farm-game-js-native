import { GameBoard } from "../layouts/GameBoard.js";
import { BOARD_SIZE } from "./config.js";

const board = new GameBoard(BOARD_SIZE);
const launchPoint = document.getElementById('root');
launchPoint.style.gridTemplateRows = `repeat(${BOARD_SIZE}, 1fr)`;
launchPoint.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

launchPoint.append(...board.elements);

board.startGameTicker();