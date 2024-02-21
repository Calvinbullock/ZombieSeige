import { Entity } from './entity.js';

export class Player extends Entity{

    #gun1;
    #gun2;
    #activegun;
    movingLeft = false;
    movingUp = false;
    movingDown = false;
    movingRight = false;

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
            movementY -= 1;
        }
        if (this.movingDown) {
            movementY += 1;
        }
        if (this.movingLeft) {
            movementX -= 1;
        }
        if (this.movingRight) {
            movementX += 1;
        }
    
        // Normalize the movement vector
        // const magnitude = Math.sqrt(movementX * movementX + movementY * movementY);
        // if (magnitude !== 0) {
        //     movementX /= magnitude;
        //     movementY /= magnitude;
        // }
    
        // Apply the normalized movement
        this.moveBy(movementX, movementY);
    }
    

}
