import { Player } from "./player.js";
import { Zombie } from "./zombie.js";
import { Map } from "./map.js";
import { Camera } from "./camera.js";
export class Game {
  player;
  #zombies;
  #round;
  #map;
  #direction;
  canvas;
  #camera;
  constructor() {
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", "direction_in", 100, 100, 100);
    // makes test zombie
    this.testZombie = new Zombie(25, "./assets/zombie_fem.png", "direction_in", 100, 100, 100);
    this.canvas = document.querySelector("#myCanvas").getContext("2d");
    this.#map = new Map();
    let x = this.#map.getWidth();
    let y = this.#map.getHeight();
    this.#camera = new Camera(x, y);
  }

  gameLoop() {
    this.#moveEntities();
    this.#drawScreen();
  }

  #checkColisions() {}

  #moveEntities() {
    this.player.move();
  }

  #spawnZombies() {
    let zomX = this.testZombie.getX();
    let zomY = this.testZombie.getY();

    console.log("zombie x position " + zomX);
    console.log("zombie y position " + zomY);

    this.testZombie.Draw(this.canvas, zomX, zomY);
  }

  #drawScreen() {
    let playerX = this.player.getX();
    let playerY = this.player.getY();

    // console.log("player x position " + playerX);
    // console.log("player y position " + playerY);

    // player position
    let x = this.#camera.getPlayerX(playerX);
    let y = this.#camera.getPlayerY(playerY);

    // console.log("player x screen position "+ x);
    // console.log("player y screen position "+ y);

    // clear canvas
    this.canvas.clearRect(0, 0, 600, 400);

    // draw map

    let mapX = this.#camera.getMapX(playerX);
    let mapY = this.#camera.getMapY(playerY);

    // console.log("mapX " + mapX + "mapY " + mapY);

    let mapXIndex = this.#camera.getMapXIndex(playerX);
    let mapYIndex = this.#camera.getMapYIndex(playerY);

    // console.log("Map X index " + mapXIndex);
    // console.log("Map Y index " + mapYIndex);

    this.#map.draw(mapX, mapY, mapXIndex, mapYIndex);

    //draw player
    this.player.Draw(this.canvas, x, y);



    let zomX = this.testZombie.getX();
    let zomY = this.testZombie.getY();

    console.log("zombie x position " + zomX);
    console.log("zombie y position " + zomY);

    let zomScreenX = this.#camera.getEntityX(playerX,zomX);
    let zomScreenY = this.#camera.getEntityY(playerY,zomY);

    this.testZombie.Draw(this.canvas, zomScreenX, zomScreenY);
  }

  #damage() {}
}
