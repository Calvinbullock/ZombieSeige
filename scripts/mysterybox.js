import { Store } from "./store.js";
import { Pistol } from "./pistol.js";
import { Shotgun } from "./shotgun.js";
import { Rifle } from "./rifle.js";


export class MysteryBox extends Store {    

    constructor() {
      super("./assets/mystery_crate.png",1000,"Mystery Gun")

    }
    purchase(player)
    {
        let playerPoints = player.getPoints();

        let costPoints = this.getCost();



        if (playerPoints >= costPoints)
        {
            player.usePoints(costPoints)

            let randomnum = Math.floor(Math.random() * 3) + 1;

            switch(randomnum)
            {
                case 1:
                    player.equipWeapon(new Pistol)
                    break;
        
                case 2:
                    player.equipWeapon(new Shotgun)
                    break;

                case 3:
                    player.equipWeapon(new Rifle)
                    break;

            }
        }
    }
  }
  