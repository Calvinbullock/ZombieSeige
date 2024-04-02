import { Store } from "./store.js";
export class UpgradeBench extends Store {
  constructor() {
    super("./assets/floors/workbench.png", 5000, "Upgrade ");
  }
  purchase(player) {
    let playerPoints = player.getPoints();
    let gun = player.getActiveGun();
    let costPoints = gun.getCost();

    if (playerPoints >= costPoints) {
      player.usePoints(costPoints);

      gun.upgrade();
      gun.refillAmmo();
      gun.reload();
      gun.refillAmmo();
    }
  }
  drawUI(camera) {
    let ctx = camera.getCanvas();
    // Set the fill style to semi-transparent green
    let cost = this.getCost();
    ctx.fillStyle = "rgba(1, 1, 200, 0.5)"; // 0.5 alpha value for transparency

    // Draw a rectangle starting at (x, y) with width and height
    var x = 140;
    var y = 5;
    var width = 110;
    var height = 50;
    ctx.fillRect(x, y, width, height);

    let name = this.getName();

    ctx.fillStyle = "black";
    ctx.font = "13px serif";
    let nametxt = "Buy: " + name;
    ctx.fillText(nametxt, 141, 20);

    ctx.fillStyle = "black";
    ctx.font = "13px serif";
    let costtxt = "Cost: " + cost.toString();
    ctx.fillText(costtxt, 141, 35);

    ctx.fillStyle = "black";
    ctx.font = "13px serif";
    let tip = "Press F to buy";
    ctx.fillText(tip, 141, 50);
  }
}
