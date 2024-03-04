import { Player } from "./player.js";
import { Zombie } from "./zombie.js";
import { Map } from "./map.js";
import { Camera } from "./camera.js";
export class Game {
  player;
  #zombies = [];
  #round;
  #map;
  #direction;
  #camera;
  bullets = [];

  constructor() {
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", "direction_in", 100, 100, 100);
    // makes test zombie
    

    this.#map = new Map();

   

    let x = this.#map.getWidth();
    let y = this.#map.getHeight();

    console.log(x + " " + y);

    this.#camera = new Camera(x, y);

    for (let x = 0; x < 20; x++) {
      this.bullets[x] = [];
      this.#zombies[x] = []
      for (let y = 0; y < 20; y++) {
        this.bullets[x][y] = [];
        this.#zombies[x][y] = []
      }
    }


    this.spawnZombies();

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

    
    this.bullets.forEach((arrayX, x) => 
    {
      arrayX.forEach((arrayY, y) => 
      {
          arrayY.forEach((bullet, z) => 
          {
            // Check conditions to remove bullet (for example, if it's out of bounds)
            if (bullet.getTileX() != x || bullet.getTileY() != y) 
            {
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

    this.#zombies.forEach((arrayX, x) => 
    {
      arrayX.forEach((arrayY, y) => 
      {
          arrayY.forEach((zombie, z) => 
          {
            // Check conditions to remove bullet (for example, if it's out of bounds)
            if (zombie.getTileX() != x || zombie.getTileY() != y) 
            {
              // Remove the bullet from the array
              this.#zombies[x][y].splice(z, 1);
              if (zombie.getTileX() < 20 && zombie.getTileX() >= 0 && zombie.getTileY() < 20 && zombie.getTileY() >= 0)
              {
                this.#zombies[zombie.getTileX()][zombie.getTileY()].push(zombie);
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
    // this.#zombies.forEach((zombie) => {
    //   zombie.move(this.player.getX(), this.player.getY());
    // });

    this.#zombies.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((zombie, z) => {
            zombie.move(this.player.getX(), this.player.getY());

          });
      });
    });


    this.bullets.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((bullet, z) => {
            bullet.move();

          });
      });
    });
  }

  spawnZombies() {
    this.#zombies[3][3].push(new Zombie(25, "./assets/zombie_fem.png", "direction_in", 100, 100, .3));
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
    this.#zombies.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((zombie, z) => {
            zombie.Draw(this.#camera,this.player);

          });
      });
    });
    // this.testZombie.Draw(this.#camera,this.player);
  }

  #damage() {}
}
