class Entity {

    #pos_x; 
    #pos_y;
    #speed;
    #health;
    #max_health;
    #img;
    #direction;
    
    constructor(sprite_in, direction_in, health_in, speed_in, img_in pos_y_in) {
        this.#pos_x = sprite_in;
        this.#pos_y = direction_in;
        this.#speed = speed_in;
        this.#max_health = health_in;
        this.img = img_in;
        this.#direction = pos_y_in;
    }

    moveBy() { }

    update_health() { }

    reset_health() {
        health = this.#max_health;
    }
}

