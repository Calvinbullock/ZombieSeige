import { Tile } from "./tile.js";

export class Pit extends Tile {
  #duration;

  constructor() {
    super(false,true,"./assets/edge.png")
  }
}

