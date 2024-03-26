import { Bullet } from "./bullet.js";

export class Gun {
  // --- Var ---

  #current_ammo; // int
  #loaded_ammo;
  #max_loaded_ammo;
  #max_ammo; // int
  #name; // str
  #damage; // int
  #bullet_duration; // double
  #bullet_count; // int - the amount of bullets spawned when fire button clicked
  #bullet_accuracy; // the lower this is the more accurate
  #fire_sfx; // filepath
  #reload_sfx; // filepath
  #sprite_left;
  #sprite_right; // filepath
  #posX;
  #posY;
  #muzzle_dist_left;
  #muzzle_dist_right;
  #bullet_speed;

  constructor(
    max_ammo_in,
    name_in,
    damage_in,
    bullet_duration_in,
    bullet_count_in,
    fire_sfx_in,
    reload_sfx_in,
    sprite_left_in,
    sprite_right_in,
    accuracy_in,
    loaded_ammo_in,
    muzzle_dist_left_in,
    muzzle_dist_right_in,
    speed_in
  ) {
    this.#current_ammo = max_ammo_in;
    this.#max_ammo = max_ammo_in;
    this.#name = name_in;
    this.#damage = damage_in;
    this.#bullet_duration = bullet_duration_in;
    this.#bullet_count = bullet_count_in;
    this.#fire_sfx = fire_sfx_in;
    this.#reload_sfx = reload_sfx_in;

    this.#sprite_left = new Image();
    this.#sprite_right = new Image();

    this.#sprite_left.src = sprite_left_in;
    this.#sprite_right.src = sprite_right_in;

    this.#bullet_accuracy = accuracy_in;

    this.#max_loaded_ammo = loaded_ammo_in;
    this.#loaded_ammo = loaded_ammo_in;
    this.#muzzle_dist_left = muzzle_dist_left_in;
    this.#muzzle_dist_right = muzzle_dist_right_in;
    this.#bullet_speed = speed_in;
  }

  // Return the Gun X tile
  getTileX() {
    return Math.floor(this.#posX / 32);
  }

  // Return the Gun Y tile
  getTileY() {
    return Math.floor(this.#posY / 32);
  }


  // --- methods ---

  // --getters--
  getName() {
    return this.#name;
  }

  getDamage() {
    return this.#damage;
  }

  getBulletDuration() {
    return this.#bullet_duration;
  }

  getBulletCount() {
    return this.#bullet_count;
  }
  getFireSfx() {
    return this.#fire_sfx;
  }

  getReloadSfx() {
    return this.#reload_sfx;
  }

  getSpriteLeft() {
    return this.#sprite_left;
  }
  getSpriteRight() {
    return this.#sprite_right;
  }

    getAmmo() {
        return this.#current_ammo;
    }
    getMaxAmmo()
    {
        return this.#max_ammo;
    }

  // --setters--
  removeAmmo(casing) {
    casing -= this.#current_ammo;
  }

  refillAmmo() {
    this.#current_ammo = this.#max_ammo;
  }

  reload() {
    const ammoDifference = this.#max_loaded_ammo - this.#loaded_ammo;

    if (this.#current_ammo > 0) {
      if (ammoDifference > 0) {
        this.#loaded_ammo += Math.min(ammoDifference, this.#current_ammo);
        this.#current_ammo -= Math.min(ammoDifference, this.#current_ammo);
      }
    }
  }

  // Shoots the gun
  shoot(bullets, mouseX, mouseY, player, camera) {
    // Calculate the angle between the shooter and the mouse position

    if (this.#loaded_ammo > 0) {
      this.#loaded_ammo -= 1;
      let x = camera.getObjectScreenPositionX(player.getX(), this.#posX + 4);
      let y = camera.getObjectScreenPositionY(player.getY(), this.#posY + 2);

      let deltaX = mouseX - x;
      let deltaY = mouseY - y;

      let angle = Math.atan2(deltaY, deltaX);

      for (let i = 0; i < this.#bullet_count; i++) {
        let angle_offset =
          Math.random() * (this.#bullet_accuracy + this.#bullet_accuracy) -
          this.#bullet_accuracy;

        let bullet;
        let directionX = player.whereIsMouseX(
          camera.getPlayerScreenPositionX(player.getX())
        );

        switch (directionX) {
          case "left":
            bullet = new Bullet(
              10,
              this.#posX + this.#muzzle_dist_left,
              this.#posY + 4,
              angle + angle_offset,
              this.#damage,
              this.#bullet_speed
            );
            break;

          case "right":
            bullet = new Bullet(
              10,
              this.#posX + this.#muzzle_dist_right,
              this.#posY + 4,
              angle + angle_offset,
              this.#damage,
              this.#bullet_speed
            );
            break;
 
          default:
            // bullet = new Bullet(10, this.#posX + 4, this.#posY + 5, angle+angle_offset,this.#damage,this.#bulletSpeed);
            console.log("gun jammed");
            break;
        }

        // Create a new bullet object with the calculated angle

        // Push the bullet into the bullets array
        let xindex = this.getTileX();
        let yindex = this.getTileY();

        bullets[xindex][yindex].push(bullet);
      }
    }
  }

  // updates the gun position
  updatePos(player, camera) {
    //console.log("update");
    let directionX = player.whereIsMouseX(
      camera.getPlayerScreenPositionX(player.getX())
    );

    switch (directionX) {
      case "left":
        this.#posX = player.getX() - 4;
        this.#posY = player.getY() + 4;
        break;

      case "right":
        this.#posX = player.getX() + 16;
        this.#posY = player.getY() + 4;
        break;
    }
  }

  // Draws the gun and displays how much ammo it has
  draw(player, camera) {
    let x = camera.getObjectScreenPositionX(player.getX(), this.#posX);
    let y = camera.getObjectScreenPositionY(player.getY(), this.#posY);

    let playerx = camera.getPlayerScreenPositionX(player.getX());

    let ctx = camera.getCanvas();

    // gets the mouses' x position relitive to the player
    let direction = player.whereIsMouseX(playerx);

    // x-3,y for facing and aiming left
    // x+18,y for facing and aiming right
    //changes the gun sprite and position based on the direction given by whereIsMouseX
    switch (direction) {
      case "left":
        ctx.drawImage(this.#sprite_left, x - 5, y+2);
        break;

      case "right":
        ctx.drawImage(this.#sprite_right, x - 4, y+2);
        break;

      default:
        ctx.drawImage(this.#sprite_left, x - 5, y+2);
        break;
    }

          ctx.font = "10px serif";
          let ammoCount = this.#loaded_ammo.toString() + "  " + this.#current_ammo.toString();
          
          // Draw black border for name text
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2; // Adjust the border thickness as needed
          ctx.strokeText(this.#name, 220, 110);
          
          // Draw white fill for name text
          ctx.fillStyle = "white";
          ctx.fillText(this.#name, 220, 110);
          
          // Draw black border for ammo count text
          ctx.strokeStyle = "black";
          ctx.lineWidth = 2; // Adjust the border thickness as needed
          ctx.strokeText(ammoCount, 220, 120);
          
          // Draw white fill for ammo count text
          ctx.fillStyle = "white";
          ctx.fillText(ammoCount, 220, 120);

    }
}
