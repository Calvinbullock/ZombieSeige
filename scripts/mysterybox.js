/*
  MysteryBox class represents a store where players can purchase a random weapon.
  It extends the Store class.

  Usage:
  import { MysteryBox } from "./MysteryBox.js";

  const mysteryBox = new MysteryBox();
  mysteryBox.purchase(player);
*/

import { Store } from "./store.js";
import { Pistol } from "./pistol.js";
import { Shotgun } from "./shotgun.js";
import { Rifle } from "./rifle.js";
import { Sniper } from "./sniper.js";

export class MysteryBox extends Store {
  /*
    Constructor for MysteryBox class.
  */
  constructor() {
    // Call the constructor of the parent class (Store) with the appropriate parameters
    super("./assets/floors/mystery_crate.png", 1000, "Mystery Gun");
  }

  /*
    Purchase method allows a player to purchase a random weapon from the mystery box.
    It checks if the player has enough points to afford the purchase.
    If conditions are met, it deducts points from the player and equips a random weapon.

    Parameters:
    - player: Player object representing the player making the purchase.
  */
  purchase(player) {
    let playerPoints = player.getPoints();
    let costPoints = this.getCost();

    if (playerPoints >= costPoints) {
      // Deduct the cost of the purchase from the player's points
      player.usePoints(costPoints);

      // Generate a random number to select a weapon
      let randomnum = Math.floor(Math.random() * 4) + 1;

      // Equip a weapon based on the random number
      switch (randomnum) {
        case 1:
          player.equipWeapon(new Pistol());
          break;
        case 2:
          player.equipWeapon(new Shotgun());
          break;
        case 3:
          player.equipWeapon(new Rifle());
          break;
        case 4:
          player.equipWeapon(new Sniper());
          break;
      }
    }
  }
}
