import { Store } from "./store.js";

export class AmmoCrate extends Store {    

    constructor() {
        super("./assets/floors/ammocrate.png",500,"Ammocrate")

    }
    purchase(player)
{
        let playerPoints = player.getPoints();

        let costPoints = this.getCost();

        let gun = player.getActiveGun();

        let gun_ammo = gun.getAmmo();

        let max_ammo = gun.getMaxAmmo();

        let ammo_difference = max_ammo - gun_ammo;


        if (playerPoints >= costPoints && ammo_difference != 0)
    {
            player.usePoints(costPoints)

            gun.refillAmmo();


        }
    }
}

