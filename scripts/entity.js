export class Entity {

    #pos_x; 
    #pos_y;
    #speed;
    #health;
    #max_health;
    #sprite;
    #direction;
    
    // added a comma since there was an error ;)
    constructor(sprite_in, direction_in, health_in, max_health_in, speed_in, pos_x_in, pos_y_in) {
        this.#pos_x = pos_x_in;
        this.#pos_y = pos_y_in;
        this.#speed = speed_in;
        this.#health = health_in;
        this.#max_health = max_health_in;
        this.#sprite = new Image();
        this.#sprite.src = sprite_in; // Set the source of the image
        this.#direction = direction_in;
    }

    moveBy(x_movement, y_movement) 
    {
        this.#pos_x += x_movement;
        this.#pos_y += y_movement;
    }

    update_health() { }

    reset_health() {
        this.#health = this.#max_health;
    }
    Draw(ctx){
        // Assuming sprite_in represents the player's image or sprite
        // Assuming sprite_in is a pre-loaded image or sprite sheet
        // Assuming this.x and this.y represent the player's position
        ctx.drawImage(this.#sprite, this.#pos_x, this.#pos_y);

        // Additional drawing for guns, health bar, etc. can be added here
    }
}

