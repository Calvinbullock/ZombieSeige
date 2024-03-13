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


    console.log("Round Constructed")


  }
  endRound()
  {
    if (this.CurrentAliveZombies == 0)
    {
      this.currentRound++;
    } 
    return this.CurrentAliveZombies == 0;
  }
  spawnRound(zombies)
  {
    console.log("Spawning")
    // this.#zombies[3][3].push(new Zombie(2, "./assets/zombie_fem.png", "direction_in", 100, 100, .3));

    for (let count = 0; count < this.zombNumber * (this.countModifier ** (this.currentRound-1)); count++)
    {
      let zombieXpos = Math.floor(Math.random() * 620);
      let zombieYpos = Math.floor(Math.random() * 620);

      let zombieTileX = Math.floor(zombieXpos / 32);
      let zombieTileY = Math.floor(zombieYpos / 32);

      let img_path1 = "./assets/zombie_fem.png";
      let img_path2 = "./assets/zombie_male.png";
      var path = this.getRandomString(img_path1, img_path2);

      zombies[zombieTileX][zombieTileY].push(new Zombie(this.zombDamage* (this.damageModifier ** (this.currentRound-1)),path,"direction_in",this.zombHealth * (this.healthModifier ** (this.currentRound-1)),this.zombHealth * (this.healthModifier ** (this.currentRound-1)),this.zombSpeed * (this.speedModifier ** (this.currentRound-1)),zombieXpos,zombieYpos));
      console.log("Nedw Zombie")
      this.CurrentAliveZombies ++;

    }






  }
  killZombie()
  {
    this.CurrentAliveZombies--;
  }
  draw(camera)
  {
    console.log(this.CurrentAliveZombies)
    let ctx = camera.getCanvas();
    ctx.fillStyle = "black"; 
    ctx.font = "13px serif";
    let roundtxt = "Round: " + this.currentRound.toString();
    ctx.fillText(roundtxt, 5, 120);
  }
  getRandomString(string1, string2) {
    var randomNumber = Math.random();
    if (randomNumber < 0.5) {
        return string1;
    } else {
        return string2;
    }
  }



}

