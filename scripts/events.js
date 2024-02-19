import { Game } from './game.js';
import { EventHandler } from './eventhandler.js';

const gameInstance = new Game(); // Create an instance of the Game class
const eventHandler = new EventHandler;



setInterval(() => gameInstance.gameLoop(), 16);






document.addEventListener("keydown", (event) => {
    eventHandler.handleKeyDown(event, gameInstance.player);
});

document.addEventListener("keyup", (event) => {
    eventHandler.handleKeyUp(event, gameInstance.player);
});