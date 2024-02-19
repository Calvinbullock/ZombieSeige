import { Player } from './player.js';
import { Map } from './map.js';
export class Game {

  player; 
  #zombies;
  #round;
  #map;
  #direction;
  canvas;

  constructor(){
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", 'direction_in', 100, 100, 100);
    this.canvas = document.querySelector("#myCanvas").getContext('2d');
    this.#map = new Map();
  }

  gameLoop() 
  {

    this.#drawScreen();
  }

  #checkColisions() { }

  #moveEntities() { }

  #spawnZombies() { }

  #drawScreen() { 
    // clear canvas
    this.canvas.clearRect(0, 0, 600, 400);

    // draw map

    this.#map.draw(-31,-31);

    //draw player
    this.player.Draw(this.canvas);
  }

  #damage() {}
}