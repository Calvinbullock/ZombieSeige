import { Game } from "./game.js";
import { EventHandler } from "./eventhandler.js";
import { Map } from "./map.js";

let map = new Map();



// Wait for the map to finish loading before starting the game loop
map.loadMap().then(() => {
  const gameInstance = new Game(map); // Create an instance of the Game class
  const eventHandler = new EventHandler();

  setInterval(() => gameInstance.gameLoop(), 8.333);

  document.addEventListener("keydown", (event) => {
    eventHandler.handleKeyDown(event, gameInstance.player, gameInstance);
  });

  document.addEventListener("keyup", (event) => {
    eventHandler.handleKeyUp(event, gameInstance.player);
  });

  document.querySelector("#myCanvas").addEventListener("mousedown", (event) => {
    eventHandler.handleClick(event, gameInstance);
  });
});

document.querySelector('#myCanvas').addEventListener("mousemove", (event) => {
  eventHandler.setMousePosition(event, gameInstance.player);
});

