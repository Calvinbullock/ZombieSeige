import { Tile } from "./tile.js";

export class Tarp extends Tile {
  cost;
  name;
  inventory;

  constructor(path) {
    super(true, true, path, true);
    // console.log(cost)
    this.name = "tarp";
    // console.log(this.cost)
  }
  getCost() {
    // console.log(this.cost)
    return this.cost;
  }
  getName() {
    return this.name;
  }
  drawUI(camera) {
    let ctx = camera.getCanvas();
    // Set the fill style to semi-transparent green
    ctx.fillStyle = "rgba(1, 1, 200, 0.5)"; // 0.5 alpha value for transparency

    // Draw a rectangle starting at (x, y) with width and height
    var x = 140;
    var y = 5;
    var width = 110;
    var height = 50;
    ctx.fillRect(x, y, width, height);
    let use;
    if (this.inventory == null) {
      use = "drop";
    } else {
      use = "pickup";
    }

    ctx.fillStyle = "black";
    ctx.font = "13px serif";
    use += " gun";
    ctx.fillText(use, 141, 20);

    ctx.fillStyle = "black";
    ctx.font = "13px serif";
    let tip = "Press F to " + use;
    ctx.fillText(tip, 141, 50);
  }

  draw(x, y, camera) {
    let ctx = camera.getCanvas();
    ctx.drawImage(this.sprite, x, y);

    if (this.inventory != null) {
      this.inventory.drawImage;
      ctx.drawImage(this.inventory.getSpriteRight(), x + 13, y + 12);
    }
  }

  purchase(player) {
    if (this.inventory == null) {
      this.inventory = player.activegun;
      player.dropGun();
    } else {
      player.equipWeapon(this.inventory);
      this.inventory = null;
    }
  }
}
