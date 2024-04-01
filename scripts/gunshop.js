import { Store } from "./store.js";
import { Pistol } from "./pistol.js";
import { Shotgun } from "./shotgun.js";
import { Rifle } from "./rifle.js";
import { Sniper } from "./sniper.js";


export class GunShop extends Store {    

    inventory;
    constructor(path,cost,gun,name) {
        super(path,cost,name)
        this.inventory = gun;

    }
    purchase(player)
    {
        let playerPoints = player.getPoints();

        let costPoints = this.getCost();



        if (playerPoints >= costPoints)
         {
            player.usePoints(costPoints)

            player.equipWeapon(this.inventory);

         }
        
    }
    draw(x,y,camera)
    {
        let ctx = camera.getCanvas();
        ctx.drawImage(this.sprite, x, y);

        if (this.inventory != null)
        {
            this.inventory.drawImage
            ctx.drawImage(this.inventory.getSpriteRight(), x+13,y+12)
        }
    }
}

