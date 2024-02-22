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

  move(goal_x, goal_y) {
    // a simple form of movement as a placeholder
    let dx
    let dy
    let diff_y = this.getX() - goal_y;
    let diff_x = this.getY() - goal_x;

    if (diff_x > 0) {
      dx += this.getSpeed();
    } else if (diff_x < 0) {
      dx -= this.getSpeed();
    }

    if (diff_y > 0) {
      dy -= this.getSpeed();
    } else if (diff_y < 0) {
      dy -= this.getSpeed();
    }

    this.moveBy(dx, dy);
  }

  pathFinding() {}
}
