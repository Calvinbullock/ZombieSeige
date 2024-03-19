import { Bullet } from "./bullet.js";

export class Gun {

    // --- Var ---


    #current_ammo; // int
    #loaded_ammo;
    #max_loaded_ammo;
    #max_ammo; // int
    #name; // str
    #damage; // int
    #bullet_duration; // double
    #bullet_count; // int - the amount of bullets spawned when fire button clicked
    #bullet_accuracy; // the lower this is the more accurate
    #fire_sfx; // filepath
    #reload_sfx; // filepath
    #sprite_left
    #sprite_right; // filepath
    #posX;
    #posY;
    #bulletSpeed;

    
    constructor(max_ammo_in, name_in, damage_in, bullet_duration_in, bullet_count_in, fire_sfx_in, reload_sfx_in, sprite_left_in,
        sprite_right_in, accuracy_in,loaded_ammo_in,speedin) {
        this.#current_ammo = max_ammo_in; 
        this.#max_ammo = max_ammo_in;
        this.#name = name_in;
        this.#damage = damage_in;
        this.#bullet_duration = bullet_duration_in;
        this.#bullet_count = bullet_count_in;
        this.#fire_sfx = fire_sfx_in;
        this.#reload_sfx = reload_sfx_in;

        this.#sprite_left = new Image();
        this.#sprite_right = new Image();

        this.#sprite_left.src = sprite_left_in
        this.#sprite_right.src = sprite_right_in

        this.#bullet_accuracy = accuracy_in;

        this.#max_loaded_ammo = loaded_ammo_in;
        this.#loaded_ammo = loaded_ammo_in;
        this.#bulletSpeed = speedin;
    }
    getTileX()
    {
      return Math.floor(this.#posX/32);
    }
    getTileY()
    {
      return Math.floor(this.#posY/32);
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

    getSpriteLeft() {
        return this.#sprite_left
    }
    getSpriteRight() {
        return this.#sprite_right;
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
    
    reload() {
        const ammoDifference = this.#max_loaded_ammo - this.#loaded_ammo;
    
        if (this.#current_ammo > 0) {
            if (ammoDifference > 0) {
                this.#loaded_ammo += Math.min(ammoDifference, this.#current_ammo);
                this.#current_ammo -= Math.min(ammoDifference, this.#current_ammo);
            }
        }
    }

    shoot(bullets, mouseX, mouseY, player, camera) {
        // Calculate the angle between the shooter and the mouse position
   
        if (this.#loaded_ammo > 0)
        {
            this.#loaded_ammo -=1
            let x = camera.getObjectScreenPositionX(player.getX(),this.#posX+4)
            let y = camera.getObjectScreenPositionY(player.getY(),this.#posY+2)

            let deltaX = mouseX - x;
            let deltaY = mouseY - y;

            let angle = Math.atan2(deltaY, deltaX);

            for (let i = 0; i < this.#bullet_count; i++) 
            {
                let angle_offset = Math.random() * (this.#bullet_accuracy + this.#bullet_accuracy) - this.#bullet_accuracy;

                // Create a new bullet object with the calculated angle
                let bullet = new Bullet(10, this.#posX + 4, this.#posY + 2, angle+angle_offset,this.#damage,this.#bulletSpeed);

                // Push the bullet into the bullets array
                let xindex = this.getTileX();
                let yindex = this.getTileY();


                bullets[xindex][yindex].push(bullet);

            }
        }


    }

    updatePos(player)
    {
        this.#posX = player.getX() - 6
        this.#posY = player.getY() + 4

    }

    draw(player, camera)
    {
        let x = camera.getObjectScreenPositionX(player.getX(),this.#posX)
        let y = camera.getObjectScreenPositionY(player.getY(),this.#posY)

        let ctx = camera.getCanvas();

        let direction = player.whereIsMouseX(x); 

        // x-3,y for facing and aiming left
        
        switch (direction) {
            case "left":
              ctx.drawImage(this.#sprite_left, x- 3, y);
              break;
      
            case "right":
              ctx.drawImage(this.#sprite_right, x+ 3, y);
              break;
      
            default:
                ctx.drawImage(this.#sprite_left, x- 3, y);
              break;
          }

        ctx.fillStyle = "black"; 
        ctx.font = "10px serif";
        var ammoCount = this.#loaded_ammo.toString() + "  " + this.#current_ammo.toString()
        ctx.fillText(this.#name, 220, 110);
        ctx.fillText(ammoCount, 220, 120);

    }
}