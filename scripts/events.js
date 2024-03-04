import { Game } from "./game.js";
import { EventHandler } from "./eventhandler.js";

const gameInstance = new Game(); // Create an instance of the Game class
const eventHandler = new EventHandler();

setInterval(() => gameInstance.gameLoop(), 8.333);

document.addEventListener("keydown", (event) => {
  eventHandler.handleKeyDown(event, gameInstance.player,gameInstance);
});

document.addEventListener("keyup", (event) => {
  eventHandler.handleKeyUp(event, gameInstance.player);
});

document.querySelector('#myCanvas').addEventListener("mousedown", (event) => {
  eventHandler.handleClick(event,gameInstance);
});