import { Tile } from "./tile.js";

export class Wall extends Tile {
  constructor(path) {
    super(false, false, path);
  }
}
