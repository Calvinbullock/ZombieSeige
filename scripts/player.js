import { Entity } from "./entity.js";
import { Pistol } from "./pistol.js";
import { Shotgun } from "./shotgun.js";
import { Rifle } from "./rifle.js";

export class Player extends Entity {
  #mouseY;
  #mouseX;
  #gun1;
  #gun2;
  activegun;
  movingLeft = false;
  movingUp = false;
  movingDown = false;
  movingRight = false;
  #speed = 0.7;
  points = 0;

  constructor(
    gun1_in,
    gun2_in,
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
    this.#gun1 = new Pistol();
    this.#gun2 = new Shotgun();
    this.#gun2 = new Rifle();
    this.activegun = this.#gun1;
    this.activegun = this.#gun2;
  }

  setMouse(x, y) {
    this.#mouseX = x;
    this.#mouseY = y;
  }

  addpoints(added) {
    this.points += added;
  }

  getmouseX() {
    return this.#mouseX;
  }
  
  getmouseY() {
    return this.#mouseY;
  }

  reload() {
    this.activegun.reload();
  }

  switchGun() {}

  shoot(bullets, mousex, mousey, camera) {
    this.activegun.shoot(bullets, mousex, mousey, this, camera);
  }

  move() {
    // Calculate the movement vector
    let movementX = 0;
    let movementY = 0;

    if (this.movingUp) {
      movementY -= this.#speed;
    }
    if (this.movingDown) {
      movementY += this.#speed;
    }
    if (this.movingLeft) {
      movementX -= this.#speed;
    }
    if (this.movingRight) {
      movementX += this.#speed;
    }

    // Normalize the movement vector

    const diagonalFactor = 0.6; // Adjust this value as needed, lower values result in slower diagonal movement

    if (movementX !== 0 && movementY !== 0) {
      movementX *= diagonalFactor;
      movementY *= diagonalFactor;
    }

    // Apply the normalized movement
    this.moveBy(movementX, movementY);
  }

  Draw(camera) {
    let ctx = camera.getCanvas();

    let mapPositionX = camera.getPlayerScreenPositionX(
      this.getX(),
      this.getX()
    );
    let mapPositionY = camera.getPlayerScreenPositionY(
      this.getY(),
      this.getY()
    );

    ctx.drawImage(this.getSprite(), mapPositionX, mapPositionY);

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = "black"; // Change to fillStyle
    // Adjust the width and height to make the rectangle smaller
    ctx.rect(5, 5, this.getMaxHealth() / 3, 5); // Fixed typo: "3d" to "3"
    ctx.fill(); // Change to fill()

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = "blue"; // Change to fillStyle
    // Adjust the width and height to make the rectangle smaller
    ctx.rect(5, 5, this.getHealth() / 3, 5); // Fixed typo: "3d" to "3"
    ctx.fill(); // Change to fill()

    ctx.fillStyle = "black";
    ctx.font = "13px serif";
    var pointsstr = this.points.toString() + "  points";
    ctx.fillText(pointsstr, 5, 100);
  }
}
