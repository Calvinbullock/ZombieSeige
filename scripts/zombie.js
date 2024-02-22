import { Entity } from "./entity.js";

export class Zombie extends Entity {
  #damage;
  #SFX;

  constructor(
    damage_in,
    sprite_in,
    direction_in,
    health_in,
    max_health_in,
    speed_in
  ) {
    super(
      sprite_in,
      direction_in,
      health_in,
      max_health_in,
      speed_in,
      100,
      100
    );

    this.#damage = this.damage_in;
  }

  getDamage() {
    return this.#damage;
  }
  Draw(camera,player)
  {

    let ctx = camera.getCanvas();

    let mapPositionX = camera.getObjectScreenPositionX(player.getX(),this.getX());
    let mapPositionY = camera.getObjectScreenPositionY(player.getY(),this.getY());

    ctx.drawImage(this.getSprite(), mapPositionX, mapPositionY);

  }
  move(goal_x, goal_y) {
    // a simple form of movement as a placeholder

    let dx = 0;
    let dy = 0;
    let diff_y = this.getY() - goal_y;
    let diff_x = this.getX() - goal_x;


    if (diff_x > 0) {
      dx -= this.getSpeed();
    } else if (diff_x < 0) {
      dx += this.getSpeed();
    }

    if (diff_y > 0) {
      dy -= this.getSpeed();
    } else if (diff_y < 0) {
      dy += this.getSpeed();
    }

    this.moveBy(dx, dy);
  }

  pathFinding() {}
}
