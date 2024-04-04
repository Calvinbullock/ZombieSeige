/*
  HealthCrate class represents a store where players can purchase health restoration.
  It extends the Store class.

  Usage:
  import { HealthCrate } from "./HealthCrate.js";

  const healthCrate = new HealthCrate();
  healthCrate.purchase(player);
*/

import { Store } from "./store.js";

export class HealthCrate extends Store {
  /*
    Constructor for HealthCrate class.
  */
  constructor() {
    // Call the constructor of the parent class (Store) with the appropriate parameters
    super("./assets/floors/healthcrate.png", 500, "Healthcrate");
  }

  /*
    Purchase method allows a player to purchase health restoration.
    It checks if the player has enough points and if the player's health can be restored.
    If conditions are met, it deducts points from the player and restores the player's health.

    Parameters:
    - player: Player object representing the player making the purchase.
  */
  purchase(player) {
    let playerPoints = player.getPoints();
    let costPoints = this.getCost();
    let health = player.getHealth();
    let max_health = player.getMaxHealth();
    let health_difference = max_health - health;

    if (playerPoints >= costPoints && health_difference != 0) {
      // Deduct the cost of health restoration from the player's points
      player.usePoints(costPoints);

      // Restore the player's health to maximum
      player.reset_health();
    }
  }
}
