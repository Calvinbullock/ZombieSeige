/*
  AmmoCrate class represents a store where players can purchase ammunition for their active gun.
  It extends the Store class.

  Usage:
  import { AmmoCrate } from "./AmmoCrate.js";

  const ammoCrate = new AmmoCrate();
  ammoCrate.purchase(player);
*/

import { Store } from "./store.js";

export class AmmoCrate extends Store {
  constructor() {
    // Call the constructor of the parent class (Store) with the appropriate parameters
    super("./assets/floors/ammocrate.png", 500, "Ammocrate");
  }

  /*
    purchase method allows a player to purchase ammunition.
    It checks if the player has enough points and if the active gun can be refilled.
    If conditions are met, it deducts points from the player and refills the gun's ammo.
    
    Parameters:
    - player: Player object representing the player making the purchase.
  */
  purchase(player) {
    // Get the player's current points
    let playerPoints = player.getPoints();

    // Get the cost of ammunition from the crate
    let costPoints = this.getCost();

    // Get the player's active gun
    let gun = player.getActiveGun();

    // Get the current ammo count of the gun
    let gun_ammo = gun.getAmmo();

    // Get the maximum ammo capacity of the gun
    let max_ammo = gun.getMaxAmmo();

    // Calculate the difference between the maximum ammo and current ammo
    let ammo_difference = max_ammo - gun_ammo;

    // Check if the player has enough points and if the gun needs ammo
    if (playerPoints >= costPoints && ammo_difference != 0) {
      // Deduct the cost of ammunition from the player's points
      player.usePoints(costPoints);

      // Refill the ammo of the active gun
      gun.refillAmmo();
    }
  }
}
