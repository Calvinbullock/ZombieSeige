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
  #camera;

  constructor() {
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", "direction_in", 100, 100, 100);
    // makes test zombie
    this.testZombie = new Zombie(25, "./assets/zombie_fem.png", "direction_in", 100, 100, .3);

    this.#map = new Map();

   

    let x = this.#map.getWidth();
    let y = this.#map.getHeight();

    console.log(x + " " + y);

    this.#camera = new Camera(x, y);
  }

  gameLoop() {
    this.#moveEntities();
    this.#drawScreen();
  }

  #checkColisions() {}

  #moveEntities() {
    this.player.move();
    this.testZombie.move(this.player.getX(), this.player.getY());
  }

  #spawnZombies() {

  }

  #drawScreen() {
    //clear the screen
    this.#camera.clearScreen();

    //draw map
    this.#map.draw(this.player,this.#camera);

    //draw player
    this.player.Draw(this.#camera);

    //draw test zombie
    this.testZombie.Draw(this.#camera,this.player);
  }

  #damage() {}
}
