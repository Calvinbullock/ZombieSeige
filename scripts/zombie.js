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
  draw(camera,player)
  {
    


    let ctx = camera.getCanvas();

    let mapPositionX = Math.floor(camera.getObjectScreenPositionX(player.getX(),this.getX()));
    let mapPositionY = Math.floor(camera.getObjectScreenPositionY(player.getY(),this.getY()));




    ctx.drawImage(this.getSpriteLeft(), mapPositionX, mapPositionY);

    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "black";
    // Adjust the width and height to make the rectangle smaller
    ctx.rect(mapPositionX+2, mapPositionY, 10, 0.5);
    ctx.stroke();

    let maxHealth = this.getMaxHealth();

    let health = this.getHealth();

    let healthPercent = health/maxHealth;
    
    let healthWidth = 10 * healthPercent;


    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = "blue";
    // Adjust the width and height to make the rectangle smaller
    ctx.rect(mapPositionX+2, mapPositionY, healthWidth, 0.5);
    ctx.stroke();

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

    const diagonalFactor = 0.6;
    if (dx !== 0 && dy !== 0) {
      dx *=  diagonalFactor;
      dy *=  diagonalFactor;
    }
   // Apply the normalized movement
   
   let x_offset = 4;
   let Y_offset = 1;

   if (dx < 0)
   {
     x_offset-=1;
   }

   if (dx > 0)
   {
     x_offset+=9;
   }

   if (dy < 0)
   {
     Y_offset+=2;
   }

   if (dy > 0)
   {
     Y_offset+=14;
   }


   let tilex = this.getTileX(x_offset);
   let tiley = this.getTileY(Y_offset);



   if (map.getWalkthrough(tilex,this.getTileY(5)))
   {
     this.moveBy(dx, 0);
   }

   if (map.getWalkthrough(this.getTileX(4),tiley))
   {
     this.moveBy(0, dy);
   }

    // this.moveBy(dx, dy);
  }

  pathFinding() {}
}
