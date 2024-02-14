import { Player } from './player.js';

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
  }

  gameLoop() 
  {

    this.#drawScreen();
  }

  #checkColisions() { }

  #moveEntities() { }

  #spawnZombies() { }

  #drawScreen() { 
    this.canvas.clearRect(0, 0, 600, 400);
    this.player.Draw(this.canvas);
  }

  #damage() {}
}