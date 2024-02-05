class Gun {

    // --- Var ---


    #current_ammo // int
    #max_ammo // int
    #name // str
    #damage // int
    #bullet_duration // double
    #bullet_count // int - the amount of bullets spawned when fire button clicked
    #fire_sfx // filepath
    #reload_sfx // filepath
    #img // filepath


    constructor(current_ammo, max_ammo, name, damage, bullet_duration, bullet_count, fire_sfx, reload_sfx, img) {
        this.#current_ammo =current_ammo 
        this.#max_ammo =max_ammo
        this.#name =name
        this.#damage =damage
        this.#bullet_duration =bullet_duration
        this.#bullet_count =bullet_count
        this.#fire_sfx =fire_sfx
        this.#reload_sfx =reload_sfx
        this.#img =img
        
    }


    // --- methods ---

    // --getters--
    get_name() {
        return this.#name
    }

    get_damage() {
        return this.#damage
    }

    get_bullet_duration() {
        return this.#bullet_duration
    }

    get_bullet_duration() {
        return this.#bullet_count
    }
    get_fire_sfx() {
        return this.#fire_sfx
    }

    get_reload_sfx() {
        return this.#reload_sfx
    }

    get_img() {
        return this.#img
    }

    get_ammo() {
        return this.#current_ammo
    }

    // --setters--
    remove_ammo(casing) {
        casing -= this.#current_ammo
    }

    refill_ammo() {
        this.#current_ammo = this.#max_ammo
    }

    shoot() {}
}