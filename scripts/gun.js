import { Bullet } from "./bullet.js";

export class Gun {

    // --- Var ---


    #current_ammo; // int
    #max_ammo; // int
    #name; // str
    #damage; // int
    #bullet_duration; // double
    #bullet_count; // int - the amount of bullets spawned when fire button clicked
    #fire_sfx; // filepath
    #reload_sfx; // filepath
    #img; // filepath
    #posX;
    #posY;

    
    constructor(current_ammo_in, max_ammo_in, name_in, damage_in, bullet_duration_in, bullet_count_in, fire_sfx_in, reload_sfx_in, img_in) {
        this.#current_ammo = current_ammo_in; 
        this.#max_ammo = max_ammo_in;
        this.#name = name_in;
        this.#damage = damage_in;
        this.#bullet_duration = bullet_duration_in;
        this.#bullet_count = bullet_count_in;
        this.#fire_sfx = fire_sfx_in;
        this.#reload_sfx = reload_sfx_in;
        this.#img = new Image();
        this.#img.src = img_in;
        
    }


    // --- methods ---

    // --getters--
    getName() {
        return this.#name;
    }

    getDamage() {
        return this.#damage;
    }

    getBulletDuration() {
        return this.#bullet_duration;
    }

    getBulletCount() {
        return this.#bullet_count;
    }
    getFireSfx() {
        return this.#fire_sfx;
    }

    getReloadSfx() {
        return this.#reload_sfx;
    }

    getImg() {
        return this.#img;
    }

    getAmmo() {
        return this.#current_ammo;
    }

    // --setters--
    removeAmmo(casing) {
        casing -= this.#current_ammo;
    }

    refillAmmo() {
        this.#current_ammo = this.#max_ammo;
    }

    shoot(bullets, mouseX, mouseY, player, camera) {
        // Calculate the angle between the shooter and the mouse position
   


        let x = camera.getObjectScreenPositionX(player.getX(),this.#posX+4)
        let y = camera.getObjectScreenPositionY(player.getY(),this.#posY+2)

        let deltaX = mouseX - x;
        let deltaY = mouseY - y;

        let angle = Math.atan2(deltaY, deltaX);

        // Create a new bullet object with the calculated angle
        let bullet = new Bullet(10, this.#posX + 4, this.#posY + 2, angle);

        // Push the bullet into the bullets array
        bullets.push(bullet);
    }

    updatePos(player)
    {
        this.#posX = player.getX() - 6
        this.#posY = player.getY() + 4

    }
    draw(player,camera)
    {
        let x = camera.getObjectScreenPositionX(player.getX(),this.#posX)
        let y = camera.getObjectScreenPositionY(player.getY(),this.#posY)

        let ctx = camera.getCanvas();

        ctx.drawImage(this.#img, x, y);

    }
}