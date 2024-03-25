import { Entity } from "./entity.js";

export class Zombie extends Entity {
  #damage;
  #SFX;
  radius = 6;
  alive = true;
  cooldown = 10;
  wait=0;

  constructor(
    damage_in,
    sprite_left_in,
    sprite_right_in,
    health_in,
    max_health_in,
    speed_in,
    x,
    y,
    xbound_in,
    ybound_in
  ) {
    super(
      sprite_left_in,
      sprite_right_in,
      health_in,
      max_health_in,
      speed_in,
      x,
      y,
      xbound_in,
      ybound_in
    );

    this.#damage = damage_in;
  }


  getDamage() {

    if (this.wait == 0)
    {
      this.wait += 1;
      return this.#damage;
    }
    this.wait += 1;
    if (this.wait == this.cooldown)
    {
      this.wait = 0;
    }

    return 0;
    
      

    
  }
  getStatus()
  {
    return (this.getHealth() > 0);
  }
  
  // Draws the zombie
  draw(camera, player) {
    // get the canvas to draw on
    let ctx = camera.getCanvas();

    // get the map positions of player and zombie, this is separate from the screen position
    let playerX = player.getX();
    let playerY = player.getY();
    let zombX = this.getX();
    let zombY = this.getY();

    // find the screen position to draw the zombie on
    let screenPositionX = Math.floor(camera.getObjectScreenPositionX(playerX, zombX));
    let screenPositionY = Math.floor(camera.getObjectScreenPositionY(playerY, zombY));

    // Only draw if the zombie is visible on the canvas
    if (screenPositionX <= 256 && screenPositionY <= 128 && screenPositionX >= -16 && screenPositionY >= -16) {
        ctx.drawImage(this.getSpriteLeft(), screenPositionX, screenPositionY);

        // get zombie health
        let maxHealth = this.getMaxHealth();
        let health = this.getHealth();
        // draw only if zombie is damaged
        if (health != maxHealth)
        {
          // draw the black backround for the health bar
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = "black";
          ctx.rect(screenPositionX + 2, screenPositionY, 10, 0.5);
          ctx.stroke();

          // find the blue healthbar width
          let healthPercent = health / maxHealth;
          let healthWidth = 10 * healthPercent;

          // draw blue health bar
          ctx.beginPath();
          ctx.strokeStyle = "blue";
          ctx.rect(screenPositionX + 2, screenPositionY, healthWidth, 0.5);
          ctx.stroke();
        }

    }
}


  move(goal_x, goal_y,map) {
    // a simple form of movement as a placeholder

    let dx = 0;
    let dy = 0;
    let diff_y = this.getY() - goal_y;
    let diff_x = this.getX() - goal_x;


    if (diff_x > 1) {
      dx -= this.getSpeed();
    } else if (diff_x < -1) {
      dx += this.getSpeed();
    }

    if (diff_y > 1) {
      dy -= this.getSpeed();
    } else if (diff_y < -1) {
      dy += this.getSpeed();
    }

    this.moveBy(dx,dy,map);
  }

  pathFinding() {}
}
