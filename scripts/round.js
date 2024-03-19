import { Zombie } from "./zombie.js";


export class Round 
{
  speedModifier = 1.1;
  countModifier = 1.1;
  damageModifier = 1.1;
  healthModifier = 1.1;
  
  zombNumber = 10;
  zombDamage = 1;
  zombHealth = 50;
  zombSpeed = .3;

  currentRound = 1;
 
  CurrentAliveZombies = 0;




  constructor()
  {
  }

  // Return true if the round is over, and increments the round number
  endRound()
  {
    if (this.CurrentAliveZombies == 0)
    {
      this.currentRound++;
    } 
    return this.CurrentAliveZombies == 0;
  }

  // Spawn the next round
  spawnRound(zombies,xbound,ybound,map)
  {
    
    // this.#zombies[3][3].push(new Zombie(2, "./assets/zombie_fem.png", "direction_in", 100, 100, .3));

    let count = 0;
    while (count < this.zombNumber * (this.countModifier ** (this.currentRound-1)) )
    {

      let zombieXpos = Math.floor(Math.random() * ((xbound*32)-5));
      let zombieYpos = Math.floor(Math.random() * ((ybound*32)-5));

      let zombieTileX = Math.floor(zombieXpos / 32);
      let zombieTileY = Math.floor(zombieYpos / 32);

      zombieXpos = (zombieTileX * 32)+2 + Math.floor(Math.random() * 25);
      zombieYpos = (zombieTileY * 32)+2 + Math.floor(Math.random() * 25);

      var path = this.getRandomString("one", "two");

      let img_path_left = "./assets/zombie_fem_left.png";
      let img_path_right = "./assets/zombie_fem_right.png";

      switch (path) {
        case "one":
          img_path_left = "./assets/zombie_fem_left.png";
          img_path_right = "./assets/zombie_fem_right.png";
          break;
          
        case "two":
          img_path_left = "./assets/zombie_male_left.png";
          img_path_right = "./assets/zombie_male_right.png";
          break;
      }

      if(map.getWalkthrough(zombieTileX,zombieTileY))
      {
        zombies[zombieTileX][zombieTileY].push(new Zombie(this.zombDamage* (this.damageModifier ** (this.currentRound-1)),img_path_left, img_path_right,this.zombHealth * (this.healthModifier ** (this.currentRound-1)),this.zombHealth * (this.healthModifier ** (this.currentRound-1)),this.zombSpeed * (this.speedModifier ** (this.currentRound-1)),zombieXpos,zombieYpos,xbound,ybound));
     
        this.CurrentAliveZombies ++;
        count++;
      }
      
    }
  }

  // When called remove 1 from current zombie count
  killZombie()
  {
    this.CurrentAliveZombies--;
  }

  // Draw the round number
  draw(camera)
  {
    let ctx = camera.getCanvas();
    ctx.fillStyle = "black"; 
    ctx.font = "13px serif";
    let roundtxt = "Round: " + this.currentRound.toString();
    ctx.fillText(roundtxt, 5, 120);
  }

  drawGameOver(camera) {
    let ctx = camera.getCanvas();
    ctx.fillStyle = "Red"; 
    ctx.font = "25px serif";
    let roundtxt = "Game Over"
    ctx.fillText(roundtxt, 5, 120);
  }

  // Picks a random string so we can randomize the zombie image
  getRandomString(string1, string2) {
    var randomNumber = Math.random();
    if (randomNumber < 0.5) {
        return string1;
    } else {
        return string2;
    }
  }



}

