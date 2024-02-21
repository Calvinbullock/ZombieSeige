import { Entity } from './entity.js';

export class Zombie extends Entity{

#damage;
#SFX;

constructor(damage_in, sprite_in, direction_in, health_in, max_health_in, speed_in){
    super(sprite_in, direction_in, health_in, max_health_in, speed_in, 300, 300);

    this.#damage = this.damage_in

    }

    getDamage(){
        return this.#damage

    }

    pathFinding(){}
}