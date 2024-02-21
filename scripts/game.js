import { Player } from './player.js';
import { Map } from './map.js';
import { Camera } from './camera.js';
export class Game {

  player; 
  #zombies;
  #round;
  #map;
  #direction;
  canvas;
  #camera;
  constructor(){
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", 'direction_in', 100, 100, 100);
    this.canvas = document.querySelector("#myCanvas").getContext('2d');
    this.#map = new Map();
    let x = this.#map.getWidth();
    let y = this.#map.getHeight();
    this.#camera = new Camera(x,y);
  }

  gameLoop() 
  {
    this.#moveEntities();
    this.#drawScreen();
  }

  #checkColisions() { }

  #moveEntities() 
  { 
    this.player.move();
  }

  #spawnZombies() { }

  #drawScreen() { 
    let playerX = Math.floor(this.player.getX())
    let playerY = Math.floor(this.player.getY())

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

    this.#map.draw(mapX,mapY,mapXIndex,mapYIndex);


    //draw player
    this.player.Draw(this.canvas,x,y);
  }

  #damage() {}
}