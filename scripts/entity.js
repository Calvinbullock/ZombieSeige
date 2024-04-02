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
    #movingLeft = false;
    #movingUp = false;
    #movingDown = false;
    #movingRight = false;
    #screaming = false;
    #audio;

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

    setMoveUpTrue()
{
        this.#movingUp = true;
    }
    setMoveUpFalse()
{
        this.#movingUp = false;
    }

    setMoveRightFalse()
{
        this.#movingRight = false;
    }
    setMoveRightTrue()
{
        this.#movingRight = true;
    }

    setMoveLeftFalse()
{
        this.#movingLeft = false;
    }
    setMoveLeftTrue()
{
        this.#movingLeft = true;
    }

    setMoveDownTrue()
{
        this.#movingDown = true;
    }
    setMoveDownFalse()
{
        this.#movingDown = false;
    }

    isMovingUp()
{
        return this.#movingUp;
    }

    isMovingLeft()
{
        return this.#movingLeft;
    }

    isMovingRight()
{
        return this.#movingRight;
    }

    isMovingDown()
{
        return this.#movingDown;
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

    screams
    scream()
    {
        if (this.#screaming == false)
        {
            this.#screaming = true;

            this.#audio = new Audio('./assets/ZombieScream.mp3');

            // Play the sound
            this.#audio.play();

            this.#audio.addEventListener('ended', () => {
                this.#screaming = false;
            });
        }
    }
    stopScreaming()
    {
        this.#screaming = false;
        this.#audio.pause();
    }

    // Damage the entity
    damage(bullet_damage)
{
        this.scream();
        this.#health -= bullet_damage;

        if (this.#health <= 0)
        {
            this.stopScreaming();
            this.#health = 0;
        }
    }

    move(map) {
        // Calculate the movement vector
        let movementX = 0;
        let movementY = 0;

        if (this.isMovingUp()) {
            movementY -= this.#speed;
        }
        if (this.isMovingDown()) {
            movementY += this.#speed;
        }
        if (this.isMovingLeft()) {
            movementX -= this.#speed;
        }
        if (this.isMovingRight()) {
            movementX += this.#speed;
        }

        // Give the movement values to moveby to calculate player new position
        this.moveBy(movementX,movementY,map);
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

        let tileX = this.getTileX();
        let tileY = this.getTileY();

        if (map.getIsWater(tileX,tileY))
    {
            let marray = map.getMapArray();
            let waterfactor = marray[tileY][tileX].getSpeedModifier();
            movementX *= waterfactor;
            movementY *= waterfactor;
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

