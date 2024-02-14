import { Entity } from './entity.js';

export class Player extends Entity{

    #gun1;
    #gun2;

    constructor(gun1_in, gun2_in, sprite_in, direction_in, health_in, max_health_in, speed_in){
        super(sprite_in, direction_in, health_in, max_health_in, speed_in, 100, 100);
        this.#gun1 = gun1_in;
        this.#gun2 = gun2_in;
    }

    switch_gun(){

    }

    Shoot(){

    }

}
