import { Game } from "./game.js";
import { EventHandler } from "./eventhandler.js";
import { Map } from "./map.js";

// Initialize map
let map = new Map();



// Wait for the map to finish loading before starting the game loop
map.loadMap().then(() => {
  console.log("map loaded")

  const gameInstance = new Game(map); // Create an instance of the Game class
  console.log("Game loaded")

  const eventHandler = new EventHandler();
  console.log("Events loaded")
  setInterval(() => gameInstance.gameLoop(), 8.333);

  document.addEventListener("keydown", (event) => {
    eventHandler.handleKeyDown(event, gameInstance.player, map);
  });

  document.addEventListener("keyup", (event) => {
    eventHandler.handleKeyUp(event, gameInstance.player);
  });

  document.querySelector("#myCanvas").addEventListener("mousedown", (event) => {
    eventHandler.handleClick(event, gameInstance);
  });

  document.querySelector('#myCanvas').addEventListener("mousemove", (event) => {
    eventHandler.setMousePosition(event, gameInstance.player);
  });

  document.querySelector("#myCanvas").addEventListener('contextmenu', function (event) {
    // Prevent the default right-click menu from appearing
    event.preventDefault();

});
});



