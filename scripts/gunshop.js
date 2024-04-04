/*
  GunShop class represents a store where players can purchase weapons.
  It extends the Store class.

  Usage:
  import { GunShop } from "./GunShop.js";

  const gunShop = new GunShop(path, cost, gun, name);
  gunShop.purchase(player);
*/

import { Store } from "./store.js";
import { Pistol } from "./pistol.js";
import { Shotgun } from "./shotgun.js";
import { Rifle } from "./rifle.js";
import { Sniper } from "./sniper.js";

export class GunShop extends Store {
  inventory;

  /*
    Constructor for GunShop class.

    Parameters:
    - path: String representing the path to the image file for the store.
    - cost: Number representing the cost of purchasing from the store.
    - gun: Gun object representing the weapon available in the shop.
    - name: String representing the name of the store.
  */
  constructor(path, cost, gun, name) {
    // Call the constructor of the parent class (Store) with the appropriate parameters
    super(path, cost, name);
    this.inventory = gun;
  }

  /*
    Purchase method allows a player to purchase a weapon from the shop.
    It checks if the player has enough points to afford the weapon.
    If conditions are met, it deducts points from the player and equips the weapon.

    Parameters:
    - player: Player object representing the player making the purchase.
  */
  purchase(player) {
    let playerPoints = player.getPoints();
    let costPoints = this.getCost();

    if (playerPoints >= costPoints) {
      // Deduct the cost of the weapon from the player's points
      player.usePoints(costPoints);

      // Equip the weapon purchased from the shop
      player.equipWeapon(this.inventory);
    }
  }

  /*
    Draw method renders the gun shop onto the screen.

    Parameters:
    - x: Number representing the x-coordinate to draw the shop.
    - y: Number representing the y-coordinate to draw the shop.
    - camera: Camera object representing the game camera.
  */
  draw(x, y, camera) {
    let ctx = camera.getCanvas();
    
    // Draw the shop sprite
    ctx.drawImage(this.sprite, x, y);

    // Draw the weapon inventory icon
    if (this.inventory != null) {
      this.inventory.drawImage;
      ctx.drawImage(this.inventory.getSpriteRight(), x + 13, y + 12);
    }
  }
}
