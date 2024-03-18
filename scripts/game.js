import { Player } from "./player.js";
import { Zombie } from "./zombie.js";
import { Map } from "./map.js";
import { Camera } from "./camera.js";
import { Round } from "./round.js";
export class Game {
  player;
  #zombies = [];
  #round;
  #map;
  #direction;
  #camera;
  bullets = [];
  #mapWidth;
  #mapHeight;


  constructor(map) {
    this.player = new Player("gun1", "gun2", "./assets/player_male.png", "direction_in", 100, 100, 100);
    // makes test zombie
    

    this.#map = map;

   

    this.#mapWidth = this.#map.getWidth();
    this.#mapHeight = this.#map.getHeight();

    console.log(this.#mapWidth + " " + this.#mapHeight);

    this.#camera = new Camera(this.#mapWidth, this.#mapHeight);

    this.player = new Player("gun1", "gun2", "./assets/player_male.png", "direction_in", 100, 100, 100,this.#mapWidth, this.#mapHeight);

    for (let x = 0; x < this.#mapWidth; x++) {
      this.bullets[x] = [];
      this.#zombies[x] = []
      for (let y = 0; y < this.#mapHeight; y++) {
        this.bullets[x][y] = [];
        this.#zombies[x][y] = []
      }
    }



    this.#round = new Round();
    this.#round.spawnRound(this.#zombies,this.#mapWidth, this.#mapHeight);


  }
  getCamera()
  {
    return this.#camera;
  }

  gameLoop() {
    if (this.#round.endRound())
    {
      this.#round.spawnRound(this.#zombies,this.#mapWidth, this.#mapHeight);
    }
    this.#moveEntities();
    this.checkPlayerInteractions();
    // this.bullets.forEach((bullet) => {
    //   bullet.move();
    // });

    this.#checkColisions();
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
              if (bullet.getTileX() < this.#mapWidth && bullet.getTileX() >= 0 && bullet.getTileY() < this.#mapHeight && bullet.getTileY() >= 0 && this.#map.getShootthrough(bullet.getTileX(),bullet.getTileY()))
              {
                this.bullets[bullet.getTileX()][bullet.getTileY()].push(bullet);
              }
                  
            }
            if (bullet.getStatus() == false)
            {
              this.bullets[x][y].splice(z, 1);
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
            if (zombie.getStatus() == false)
            {
              this.#zombies[x][y].splice(z, 1);
              this.#round.killZombie();
              this.player.addpoints(100);
            }
            else
            {
            // Check conditions to remove bullet (for example, if it's out of bounds)
            if (zombie.getTileX() != x || zombie.getTileY() != y) 
            {
              // Remove the bullet from the array
              this.#zombies[x][y].splice(z, 1);
              if (zombie.getTileX() < this.#mapWidth && zombie.getTileX() >= 0 && zombie.getTileY() < this.#mapHeight && zombie.getTileY() >= 0)
              {
                this.#zombies[zombie.getTileX()][zombie.getTileY()].push(zombie);
              }
              
              
                  
            }
            }


          });
      });
    });


    this.player.activegun.updatePos(this.player);
    this.#drawScreen();
  }

  #checkColisions() 
  {
    this.#zombies.forEach((arrayX, x) => 
    {
      arrayX.forEach((arrayY, y) => 
      {
          arrayY.forEach((zombie, z) => 
          {
            for(let i = -1;i<2;i++)
            {
              for(let j = -1;j<2;j++)
              {

                let BulletXIndex = x + i;
                let BulletYIndex = y + j;

                if (BulletXIndex < this.#mapWidth && BulletXIndex >= 0 && BulletYIndex < this.#mapHeight && BulletYIndex >= 0)
                {
                  this.bullets[BulletXIndex][BulletYIndex].forEach((bullet,b) =>
                  {

                    let bulletX = bullet.getX();
                    let bulletY = bullet.getY();
                    let bulletR = bullet.getRadius();
                    

                    // add 7 and 8 too offset the center of the hitbox
                    let zombieX = zombie.getX()+7;
                    let zombieY = zombie.getY()+8;
                    let zombieR = zombie.getRadius();

                    
                    let distance = Math.sqrt((bulletX-zombieX)*(bulletX-zombieX) + (bulletY-zombieY)*(bulletY-zombieY));

                    

                    if (distance < (bulletR+zombieR))
                    {
                      
                      zombie.damage(bullet.getDamage());
                      bullet.kill();
                    }



                  });
                }

                
              }

            }


          });
      });
    });

    let playerXIndex = this.player.getTileX();
    let playerYIndex = this.player.getTileY();


    for(let i = -1;i<2;i++)
    {
      for(let j = -1; j<2;j++)
      {
        let zombTileX = playerXIndex+i;
        let zombTileY = playerYIndex + j;

        if (0 <= zombTileX && zombTileX < this.#mapWidth && 0 <= zombTileY && zombTileY < this.#mapHeight )
        {
          this.#zombies[zombTileX][zombTileY].forEach((zombie) =>
          {

            let playerX = this.player.getX()+7;
            let playerY = this.player.getY()+8;
            let playerR = this.player.getRadius();
            

            // add 7 and 8 too offset the center of the hitbox
            let zombieX = zombie.getX()+7;
            let zombieY = zombie.getY()+8;
            let zombieR = zombie.getRadius();

            
            let distance = Math.sqrt((playerX-zombieX)*(playerX-zombieX) + (playerY-zombieY)*(playerY-zombieY));

            

            if (distance < (playerR+zombieR))
            {
              
              this.player.damage(zombie.getDamage())
            }

          })
        }
      }
    }

  }

  #moveEntities() {
    this.player.move(this.#map);
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

  
    this.#round.draw(this.#camera);
  }
  checkPlayerInteractions()
  {

  }

  #damage() {}
}
