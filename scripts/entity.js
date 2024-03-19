export class Entity {

    #pos_x;
    #pos_y;
    #speed;
    #health;
    #max_health;
    #sprite_left;
    #sprite_right;
    radius = 6;
    xbound;
    ybound;

    // added a comma since there was an error ;)
    constructor(spriteLeft_in, spriteRight_in, health_in, max_health_in, speed_in, pos_x_in, pos_y_in,mapX,mapY) {
        this.#pos_x = pos_x_in;
        this.#pos_y = pos_y_in;
        this.#speed = speed_in;
        this.#health = health_in;
        this.#max_health = max_health_in;
        this.#sprite_left = new Image();
        this.#sprite_left.src = spriteLeft_in; // Set the source of the image
        this.#sprite_right = new Image();
        this.#sprite_right.src = spriteRight_in; // Set the source of the image
        this.xbound = mapX*32;
        this.ybound = mapY*32;
    }
    getHealth()
    {
        return this.#health;
    }
    getMaxHealth()
    {
        return this.#max_health;
    }
    getRadius()
    {
      return this.radius;
    }
    damage(bullet_damage)
    {
        this.#health -= bullet_damage;
        if (this.#health < 0)
        {
            this.#health = 0;
        }
    }

    moveBy(x_movement, y_movement)
    {
        if (this.#pos_x > 0 && x_movement < 0) {
            this.#pos_x += x_movement;
        }
        if (this.#pos_x < this.xbound && x_movement > 0) {
            this.#pos_x += x_movement;
        }
        if (this.#pos_y > 0 && y_movement < 0) {
            this.#pos_y += y_movement;
        }
        if (this.#pos_y < this.ybound && y_movement > 0) {
            this.#pos_y += y_movement;
        }
    }
    getSpeed()
    {
        return this.#speed
    }

    getX() {
        return this.#pos_x;
    }
    getY()
    {
        return this.#pos_y;
    }

    getSpriteLeft()
    {
      return this.#sprite_left;
    }

    getSpriteRight(){
      return this.#sprite_right;
    }

    getTileX(x_offset = 0)
    {
        return Math.floor((this.#pos_x + x_offset)/32);
    }
    getTileY(y_offset = 0)
    {
        return Math.floor((this.#pos_y+y_offset)/32);
    }

    update_health() { }

    reset_health() {
        this.#health = this.#max_health;
    }

    draw(ctx, x, y,){

        ctx.drawImage(this.#sprite_right, x, y);
        //draws the player's sprite dependant on the direction fed in
    //     switch (direction) {
    //         case "left":
    //           ctx.drawImage(this.#sprite_left, x, y);
    //           break;

    //         case "right":
    //           ctx.drawImage(this.#sprite_right, x, y);
    //           break;

    //         default:
    //             ctx.drawImage(this.#sprite_left, x, y);
    //             break;   
    //     }  

    }
}

