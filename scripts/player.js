import { Entity } from './entity.js';

export class Player extends Entity{

    #gun1;
    #gun2;
    #activegun;
    movingLeft = false;
    movingUp = false;
    movingDown = false;
    movingRight = false;
    #speed = .7;

    constructor(gun1_in, gun2_in, sprite_in, direction_in, health_in, max_health_in, speed_in){
        super(sprite_in, direction_in, health_in, max_health_in, speed_in, 300, 300);
        this.#gun1 = gun1_in;
        this.#gun2 = gun2_in;
    }

    switch_gun(){

    }

    Shoot(){

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
            movementX *=  diagonalFactor;
            movementY *=  diagonalFactor;
        }


        // Apply the normalized movement
        this.moveBy(movementX, movementY);
    }
    

}
