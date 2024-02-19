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

    this.#drawScreen();
  }

  #checkColisions() { }

  #moveEntities() { }

  #spawnZombies() { }

  #drawScreen() { 
    let playerX = this.player.getX()
    let playerY = this.player.getY()

    // player position
    let x = this.#camera.getPlayerX(playerX);
    let y = this.#camera.getPlayerY(playerY);


    // clear canvas
    this.canvas.clearRect(0, 0, 600, 400);

    // draw map


    let mapX = this.#camera.getMapX(playerX);
    let mapY = this.#camera.getMapY(playerY);
    this.#map.draw(mapX,mapY);

    console.log(playerX);
    console.log(mapX);

    //draw player
    this.player.Draw(this.canvas,x,y);
  }

  #damage() {}
}