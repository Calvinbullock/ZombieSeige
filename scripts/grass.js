import { Tile } from "./tile.js";

export class Grass extends Tile {
    #duration;
    
    constructor() {
      super(true,true,"./assets/green_grass.png")

    }
}
  