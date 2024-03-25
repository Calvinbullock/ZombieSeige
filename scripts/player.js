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
    speed_in,
    xbound_in,
    ybound_in
  ) {
    super(
      sprite_in,
      direction_in,
      health_in,
      max_health_in,
      speed_in,
      300,
      300,
      xbound_in,
      ybound_in
    );
    this.#gun1 = new Pistol();
    this.#gun2 = new Rifle();
 
    this.activegun = this.#gun1;
    // this.activegun = this.#gun2;
  }

  setMouseCoords(x, y) {
    this.#mouseX = x;
    this.#mouseY = y;
  }

  addpoints(added) {
    this.points += added;
  }

  getActiveGun()
  {
    return this.activegun;
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

  // equips the given gun
  equipWeapon(gun)
  {
    if (this.#gun1 == null)
    {
      this.#gun1 = gun
      this.activegun = this.#gun1
    } else if (this.#gun2 == null)
    {
      this.#gun2 = gun
      this.activegun = this.#gun2
    }
    else
    {
      if (this.activegun == this.#gun1)
      {
        this.#gun1 = gun
        this.activegun = this.#gun1

      } else if (this.activegun == this.#gun2)
      {

        this.#gun2 = gun
        this.activegun = this.#gun2
      }
      
    }
  }

  interact(map)
  {
    let tile = map.getMapArray()[this.getTileY(5)][this.getTileX(5)];

    if (tile.isStore)
    {
      tile.purchase(this)
    }

  }

  getPoints()
  {
    return this.points;
  }
  usePoints(points)
  {
    this.points -= points;
  }

  switchActiveGun(value) {
    switch(value)
    {
      case 1:
        if (this.#gun1 != null)
        {
          this.activegun = this.#gun1
        }
        
        // console.log("gun1")
        break;

      case 2:
        if (this.#gun2 != null)
        {
          this.activegun = this.#gun2
        }
        // console.log("gun2")
        break;
      }
  }

  shoot(bullets, mousex, mousey, camera) {
    this.activegun.shoot(bullets, mousex, mousey, this, camera);
  }

  whereIsMouseX(canPosX) {
    // locates the mouse in relation to the player

    if (this.#mouseX > canPosX) {
      return "right";

    } else if (this.#mouseX < canPosX) {
      return "left";
    }
    else
    {
      return "right";

    }
  }

  whereIsMouseY(canPosY) {
    if (this.#mouseY < canPosY) {
      return "above";

    } else if (this.#mouseY > canPosY) {
      return "below";
    }
  }

  move(map) {
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
  
    // Give the movement values to moveby to calculate player new position
    this.moveBy(movementX,movementY,map);
  }

  // draws the player
  draw(camera) {
    let ctx = camera.getCanvas();

    let mapPositionX = camera.getPlayerScreenPositionX(
      this.getX()
    );
    let mapPositionY = camera.getPlayerScreenPositionY(
      this.getY()
    );

    let direction = this.whereIsMouseX(mapPositionX);

    switch (direction) {
      case "left":
        ctx.drawImage(this.getSpriteLeft(), mapPositionX, mapPositionY);
        break;

      case "right":
        ctx.drawImage(this.getSpriteRight(), mapPositionX, mapPositionY);
        break;

      default:
        ctx.drawImage(this.getSpriteLeft(), mapPositionX, mapPositionY);
        break;
    }

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = "black"; // Change to fillStyle
    // Adjust the width and height to make the rectangle smaller
    ctx.rect(5, 5, this.getMaxHealth() / 3, 5); // Fixed typo: "3d" to "3"
    ctx.fill(); // Change to fill()

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.fillStyle = "red"; // Change to fillStyle
    // Adjust the width and height to make the rectangle smaller
    ctx.rect(5, 5, this.getHealth() / 3, 5); // Fixed typo: "3d" to "3"
    ctx.fill(); // Change to fill()

    ctx.font = "13px serif";
    let pointsstr = this.points.toString() + " points";
    
    // Draw black border
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3; // Adjust the border thickness as needed
    ctx.strokeText(pointsstr, 5, 100);
    
    // Draw white fill
    ctx.fillStyle = "white";
    ctx.fillText(pointsstr, 5, 100);
  }
}
