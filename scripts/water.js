import { Tile } from "./tile.js";

export class Water extends Tile {    



    constructor(path) 
    {
        

        super(true,true,path,true);
        // console.log(cost)
        this.cost = cost;
        this.name = name;
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
  