import { Tile } from "./tile.js";

export class Edge extends Tile {
    #duration;
    
    constructor() {
      super(false,false,"./assets/edge.png")

    }
  }
  