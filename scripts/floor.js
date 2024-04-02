import { Tile } from "./tile.js";

export class Floor extends Tile {
  constructor(path) {
    super(true, true, path);
  }
}
