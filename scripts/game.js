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
  bullets = [];

  constructor() {
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", "direction_in", 100, 100, 100);
    // makes test zombie
    this.testZombie = new Zombie(25, "./assets/zombie_fem.png", "direction_in", 50, 100, .3);

    this.#map = new Map();

   

    let x = this.#map.getWidth();
    let y = this.#map.getHeight();

    console.log(x + " " + y);

    this.#camera = new Camera(x, y);

    for (let x = 0; x < 20; x++) {
      this.bullets[x] = [];
      for (let y = 0; y < 20; y++) {
        this.bullets[x][y] = [];
      }
    }

  }
  getCamera()
  {
    console.log("cam")
    return this.#camera;
  }

  gameLoop() {
    this.#moveEntities();

    // this.bullets.forEach((bullet) => {
    //   bullet.move();
    // });

    this.bullets.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((bullet, z) => {
            bullet.move();

          });
      });
    });
    
    this.bullets.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((bullet, z) => {
              // Check conditions to remove bullet (for example, if it's out of bounds)
              if (bullet.getTileX() != x || bullet.getTileY() != y) {
                  // Remove the bullet from the array
                  this.bullets[x][y].splice(z, 1);
                  if (bullet.getTileX() < 20 && bullet.getTileX() >= 0 && bullet.getTileY() < 20 && bullet.getTileY() >= 0)
                  {
                    this.bullets[bullet.getTileX()][bullet.getTileY()].push(bullet);
                  }
                  
              }
          });
      });
  });


    this.player.activegun.updatePos(this.player);
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

    //draw gun
    this.player.activegun.draw(this.player,this.#camera)

    //draw bullets

    // this.bullets.forEach((bullet) => {
    //   bullet.draw(this.#camera, this.player);
    // });
    this.bullets.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((bullet, z) => {
            bullet.draw(this.#camera, this.player);

          });
      });
    });

    //draw test zombie
    this.testZombie.Draw(this.#camera,this.player);
  }

  #damage() {}
}
