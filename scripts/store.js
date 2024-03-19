import { Tile } from "./tile.js";

export class Store extends Tile {    
    cost;
    name;


    constructor(path,cost,name) 
    {
        

        super(true,true,path,true);
        // console.log(cost)
        this.cost = cost;
        this.name = name;
        // console.log(this.cost)
        
    }
    getCost()
    {
        // console.log(this.cost)
        return this.cost;
    }
    getName()
    {
        return this.name;
    }
    drawUI(camera)
    {

    }
  }
  