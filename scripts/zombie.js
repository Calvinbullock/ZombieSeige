import { Entity } from "./entity.js";
import { astar, Node } from "./astar.js";

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


  pathfind(player,map) {
    // a simple form of movement as a placeholder

    let graph = map.getPathFindingMap();

    let zombTileX = this.getTileX(4);
    let zombTileY = this.getTileY(5);

    // console.log( "zombie tiles " + zombTileX + " " + zombTileY)

    let playerTileX = player.getTileX(4);
    let playerTileY = player.getTileY(5);


    const path = astar(zombTileX, zombTileY, playerTileX, playerTileY, graph);

    console.log( "zombie tiles " + zombTileX + " " + zombTileY)
    console.log(path)
    console.log( "player tiles " + playerTileX + " " + playerTileY)

    if (path && path.length > 1) {
      const nextStep = path[1];

      if ( nextStep.x > zombTileX)
      {
        this.setMoveLeftFalse();
        this.setMoveRightTrue();
      } else if ( nextStep.x < zombTileX)
      {
        this.setMoveRightFalse();
        this.setMoveLeftTrue();
      }
      else
      {
        this.setMoveRightFalse();
        this.setMoveLeftFalse();
      }

      if ( nextStep.y > zombTileY)
      {
        this.setMoveUpFalse();
        this.setMoveDownTrue();
      } else if ( nextStep.y < zombTileY)
      {
        this.setMoveUpTrue();
        this.setMoveDownFalse();
      }
      else
      {
        this.setMoveUpFalse();
        this.setMoveDownFalse();
      }




    }

    else
    {
      let diff_y = this.getY() - player.getY();
      let diff_x = this.getX() - player.getX();
  
  
      if (diff_x > 1) {
        this.setMoveLeftTrue();
        this.setMoveRightFalse();
      } else if (diff_x < -1) {
        this.setMoveRightTrue();
        this.setMoveLeftFalse();
      }
  
      if (diff_y > 1) {
        this.setMoveUpTrue();
        this.setMoveDownFalse();
      } else if (diff_y < -1) {
        this.setMoveUpFalse();
        this.setMoveDownTrue();
      }
    }
  }

  pathFinding() {}
}
