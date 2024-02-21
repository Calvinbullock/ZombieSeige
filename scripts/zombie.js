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
      300,
      300
    );

    this.#damage = this.damage_in;
  }

  getDamage() {
    return this.#damage;
  }

  move() {
    // a simple form of movement as a placeholder
    Diff_y == this.testZombie.getY() - this.player.getY();
    Diff_x == this.testZombie.getX() - this.player.getX();

    if (diff_x > 0) {
      dx += this.testZombie.speed;
    } else if (diff_x < 0) {
      dx -= this.testZombie.speed;
    }

    if (diff_y > 0) {
      dy -= this.testZombie.speed;
    } else if (diff_y < 0) {
      dy -= this.testZombie.speed;
    }

    testZombie.moveby(dx, dy);
  }

  pathFinding() {}
}
