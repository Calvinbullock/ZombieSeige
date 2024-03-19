import { Tile } from "./tile.js";

export class Store extends Tile {    
    cost;


    constructor(path) {
      super(true,true,path,true,cost)

    }
    getCost()
    {
        return this.cost;
    }
    drawUI(camera)
    {

    }
  }
  