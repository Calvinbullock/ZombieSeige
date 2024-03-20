import { Store } from "./store.js";

export class HealthCrate extends Store {    

    constructor() {
      super("./assets/healthcrate.png",500,"Healthcrate")

    }
    purchase(player)
    {
        let playerPoints = player.getPoints();

        let costPoints = this.getCost();

        let health = player.getHealth();
        let max_health = player.getMaxHealth();

        let health_difference = max_health - health;


        if (playerPoints >= costPoints && health_difference != 0)
        {
            player.usePoints(costPoints)

            player.reset_health();


        }
    }
  }
  