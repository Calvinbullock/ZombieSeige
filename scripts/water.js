import { Tile } from "./tile.js";

export class Water extends Tile {    



    constructor() 
    {
        

        super(true,true,"./assets/water.png");
        // console.log(cost)
        // console.log(this.cost)
        
    }
    isWater()
    {
        return true;
    }
    getSpeedModifier()
    {
        return .5;
    }

  }
  