class Entity {

    #pos_x; 
    #pos_y;
    #speed;
    #health;
    #direction;
    
    constructor(sprite_in, direction_in, health_in, speed_in, pos_y_in) {
        this.#pos_x = sprite_in;
        this.#pos_y = direction_in;
        this.#speed = health_in;
        this.#health = speed_in;
        this.#direction = pos_y_in;
    }

    moveBy() { }

    update_health() { }
}

