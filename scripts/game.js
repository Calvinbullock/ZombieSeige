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
  #counter = 0;


  constructor(map) {

    let gender = "f";

    let img_path_left = "./assets/player/player_fem_left.png";
    let img_path_right = "./assets/player/player_fem_right.png";


    switch (gender) {
      case "f":
        img_path_left = "./assets/player/player_fem_left.png";
        img_path_right = "./assets/player/player_fem_right.png";
        break;
        
      case "m":
        img_path_left = "./assets/player/player_male_left.png";
        img_path_right = "./assets/player/player_male_right.png";
        break;
    }

    this.player = new Player("gun1", "gun2", img_path_left, img_path_right, 100, 100, 100);

    this.#map = map;
    console.log("map loaded 2")
   

    this.#mapWidth = this.#map.getWidth();
    this.#mapHeight = this.#map.getHeight();
    console.log("Get Map Dimension")


    console.log(this.#mapWidth + " " + this.#mapHeight);

    this.#camera = new Camera(this.#mapWidth, this.#mapHeight);

    this.player = new Player("gun1", "gun2", img_path_left, img_path_right, 100, 100, 100,this.#mapWidth, this.#mapHeight);
    console.log('player loaded 2')

    for (let x = 0; x < this.#mapWidth; x++) {
      this.bullets[x] = [];
      this.#zombies[x] = []
      for (let y = 0; y < this.#mapHeight; y++) {
        this.bullets[x][y] = [];
        this.#zombies[x][y] = []
      }
    }

    console.log("bullets and zombz loaded")

    this.#round = new Round();
    console.log("round initialized")
    this.#round.spawnRound(this.#zombies,this.#mapWidth, this.#mapHeight,this.#map);
    console.log("round loaded")

  }
  
  // Return the camera
  getCamera()
  {
    return this.#camera;
  }
  
  checkIfPlayerDead() 
  {
    let hp = this.player.getHealth();
    if (hp <= 0) {
      this.#round.drawGameOver(this.#camera) // BUG currently can't see this as it pops up right as page changes...
      window.location.href = "gameover.html";
    }
  }

  // Gameloop, is called 120 times per second
  gameLoop() {

    // When round is ended spawn new round
    if (this.#round.endRound())
    {
      this.#round.spawnRound(this.#zombies,this.#mapWidth, this.#mapHeight, this.#map);
    }
    // let zombies find their path, counter so it doesnt update path ever frame for performance reasons
    // counter dcounts to 10 so every 10 frames it updates path, which is 12 times a second
    if (this.#counter == 0)
    {
      this.#zombiePathFinding()
    }
    this.#counter++;
    if (this.#counter == 10)
    {
      this.#counter = 0;
    }
  

    // Move all the entities (zombies and bullets)
    this.#moveEntities();

    // Check all collisions between player, zombies and bullets
    this.#checkColisions();
    
    // Check if player dead
    //  BUG takes a sec after player is dead to change screens. 
    this.checkIfPlayerDead();
    
    // Manages the 3d bullet array, moves bullets that have moved tiles into new spot in the grid and removes the bullets that are destroyed
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
    // Manages the 3d zombie array, moves zombies that have moved tiles into new spot in the grid and removes the zombies that are destroyed
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
              else
              {
                console.log("zombie gone")
                console.log(zombie.getX() + " " + zombie.getY())
              }
              
              
                  
            }
            }


          });
      });
    });

    // Updates the gun position of the player
    this.player.activegun.updatePos(this.player,this.#camera);

    // Draws everything onto the screen
    this.#drawScreen();
  }

  // Handles the collision detection
  #checkColisions() 
  {
    // Check for zombie and bullet collisions
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

    // Check for zombie and player collisions
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

  // Move the player, zombies and bullets
  #moveEntities() {
    // Moves the player
    this.player.move(this.#map);

    // Moves the zombies
    this.#zombies.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((zombie, z) => {
            zombie.move(this.#map);

          });
      });
    });

    // Moves the bullets
    this.bullets.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((bullet, z) => {
            bullet.move();

          });
      });
    });
  }

  // Draw everything onto the screen.
  #drawScreen() {
    //clear the screen
    this.#camera.clearScreen();

    //draw map
    this.#map.draw(this.player,this.#camera);


    //draw bullets
    this.bullets.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((bullet, z) => {
            bullet.draw(this.#camera, this.player);

          });
      });
    });

    //draw all zombies by looping through each one in the 3d array.
    this.#zombies.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((zombie, z) => {
            zombie.draw(this.#camera,this.player);

          });
      });
    });

    //draw player
    this.player.draw(this.#camera);

    //draw gun
    this.player.activegun.draw(this.player,this.#camera)

    // Draws Tile UI
    this.#map.drawTileUI(this.#camera,this.player);

    // Draws the current round
    this.#round.draw(this.#camera);
  }


  #damage() {}

  // Zombie pathfinding
  #zombiePathFinding()
  {
    // Moves the zombies
    this.#zombies.forEach((arrayX, x) => {
      arrayX.forEach((arrayY, y) => {
          arrayY.forEach((zombie, z) => {
            zombie.pathfind(this.player,this.#map);
          });
      });
    });
  }
}


