import { Grass } from "./grass.js";
import { Edge } from "./edge.js";

export class Map {
  #path = "./assets/map.txt";
  #mapArray = [];
  #width;
  #height;
  #pixelWidth;
  #pixelHeight;
  #grass = new Grass();
  #edge = new Edge();

  constructor() {
  }

  loadMap() {
    return new Promise((resolve, reject) => {
      fetch(this.#path)
        .then((response) => response.text())
        .then((data) => {
          const rows = data.trim().split("\n");
          this.#mapArray = rows.map((row) => row.split(",").map(Number));
          this.#height = this.#mapArray.length;
          this.#width = this.#height > 0 ? this.#mapArray[0].length : 0;
          console.log("Map Array:", this.#mapArray);
          console.log("Width:", this.#width);
          console.log("Height:", this.#height);

          this.#pixelWidth = this.#width * 32;
          this.#pixelHeight = this.#height * 32;

          console.log(this.#pixelWidth);
          console.log(this.#pixelHeight);

          resolve(); // Resolve the promise once the map is loaded
        })
        .catch((error) => {
          console.error("Error reading the map file:", error);
          reject(error); // Reject the promise if there's an error
        });
    });
  }

  getMapArray() {
    return this.#mapArray;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getWalkthrough(x,y)
  {
    let tile = this.#mapArray[y][x];
    if (tile == 1) {
      return this.#grass.canWalkThrough();
    }
    if (tile == 2) {
      return this.#edge.canWalkThrough();
    }

  }
  getShootthrough(x,y)
  {
    let tile = this.#mapArray[y][x];
    if (tile == 1) {
      return this.#grass.canShootThrough();
    }
    if (tile == 2) {
      return this.#edge.canShootThrough();
    }

  }

  draw(player,camera) {

    let ctx = camera.getCanvas();

    let playerX = player.getX();
    let playerY = player.getY();

    // Gets the x and y values where the top left tile starts drawing
    let x = camera.getMapScreenPositionX(playerX);
    let y = camera.getMapScreenPositionY(playerY);

    // gets the top left tile index
    let xindex = camera.getMapXIndex(playerX);
    let yindex = camera.getMapYIndex(playerY);


    x = Math.floor(x);
    y = Math.floor(y);

    

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 6; j++) {
        // Perform some action or call some function here
        // For demonstration, let's log the coordinates

        let x_index = xindex + i;
        let y_index = yindex + j;

            let x_pos = x + i * 32;
            let y_pos = y + j * 32;

        if (x_index < this.#width && y_index < this.#height) {
          let tile = this.#mapArray[y_index][x_index];

          if (tile == 1) {
            ctx.drawImage(this.#grass.getSprite(), x_pos, y_pos);
          }
          if (tile == 2) {
            ctx.drawImage(this.#edge.getSprite(), x_pos, y_pos);
          }
        }
      }
    }
  }
}
