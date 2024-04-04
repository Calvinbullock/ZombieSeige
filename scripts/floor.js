/*
  Floor class represents a floor tile in the game environment.
  It extends the Tile class.

  Usage:
  import { Floor } from "./Floor.js";

  const floorTile = new Floor(path);
*/

import { Tile } from "./tile.js";

export class Floor extends Tile {
  /*
    Constructor for Floor class.
    
    Parameters:
    - path: String representing the path to the image file for the floor tile.
  */
  constructor(path) {
    // Call the constructor of the parent class (Tile) with the appropriate parameters
    super(true, true, path);
  }
}
