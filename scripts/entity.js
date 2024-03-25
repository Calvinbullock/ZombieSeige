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

    // Returns the entities current health
    getHealth()
    {
        return this.#health;
    }

    // Returns the entities max health
    getMaxHealth()
    {
        return this.#max_health;
    }

    

    // Returns the entities collision radius
    getRadius()
    {
      return this.radius;
    }

    // Damage the entity
    damage(bullet_damage)
    {
        this.#health -= bullet_damage;
        if (this.#health < 0)
        {
            this.#health = 0;
        }
    }

    // move the entity
    moveBy(movementX, movementY,map)
    {

        
        // Normalize the movement vector
        const diagonalFactor = 0.7;
        if (movementX !== 0 && movementY !== 0) 
        {
            movementX *= diagonalFactor;
            movementY *= diagonalFactor;
        }
        // determine offsets so entity collision is more accurate
        let x_offset = 4;
        let Y_offset = 1;

        if (movementX < 0) {
             x_offset -= 1;
        }

        if (movementX > 0) {
            x_offset += 9;
        }

        if (movementY < 0) {
            Y_offset += 2;
        }

        if (movementY > 0) {
            Y_offset += 14;
        }

        // find the tile to check if enity can move through it
        let tilex = this.getTileX(x_offset);
        let tiley = this.getTileY(Y_offset);

        if (map.getWalkthrough(tilex, this.getTileY(5))) {
            this.#pos_x += movementX;
        }

        if (map.getWalkthrough(this.getTileX(4), tiley)) {
            this.#pos_y += movementY;
        }

    }

    // Return entity speed
    getSpeed()
    {
        return this.#speed
    }

    // return entity x position
    getX() {
        return this.#pos_x;
    }

    // return entity y position
    getY()
    {
        return this.#pos_y;
    }

    // return entity left sprite
    getSpriteLeft()
    {
      return this.#sprite_left;
    }

    // return entity right sprite
    getSpriteRight(){
      return this.#sprite_right;
    }

    // return entity x tile
    getTileX(x_offset = 0)
    {
        return Math.floor((this.#pos_x + x_offset)/32);
    }

    // return entity y tile
    getTileY(y_offset = 0)
    {
        return Math.floor((this.#pos_y+y_offset)/32);
    }

    update_health() { }

    // reset entity health to max
    reset_health() {
        this.#health = this.#max_health;
    }

    // Draw the entity
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

