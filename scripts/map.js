import { Grass } from "./grass.js";
import { Edge } from "./edge.js";
import { Wall } from "./wall.js";

export class Map {
  #path = "./assets/map.txt";
  #mapArray = [];
  #width;
  #height;
  #pixelWidth;
  #pixelHeight;
  #grass = new Grass();
  #edge = new Edge();
  #bottom_fence = new Wall("./assets/fence_bottom.png");
  #bottom_left_fence = new Wall("./assets/fence_corner_bottom_left.png");
  #bottom_right_fence = new Wall("./assets/fence_corner_bottom_right.png");
  #top_left_fence = new Wall("./assets/fence_corner_top_left.png");
  #top_right_fence = new Wall("./assets/fence_corner_top_right.png");
  #left_fence = new Wall("./assets/fence_left.png");
  #right_fence = new Wall("./assets/fence_right.png");
  #top_fence = new Wall("./assets/fence_top.png");

  #pathfindingMap = [];

  constructor() {
  }

  // Loads the map from a text file
  loadMap() {
    return new Promise((resolve, reject) => {
      fetch(this.#path)
        .then((response) => response.text())
        .then((data) => {
          const rows = data.trim().split("\n");
          this.#mapArray = rows.map((row) => row.split(","));
  
          this.#height = this.#mapArray.length;
          this.#width = this.#height > 0 ? this.#mapArray[0].length : 0;
          console.log("Map Array:", this.#mapArray);
          console.log("Width:", this.#width);
          console.log("Height:", this.#height);
  
          this.#pixelWidth = this.#width * 32;
          this.#pixelHeight = this.#height * 32;
  
          console.log(this.#pixelWidth);
          console.log(this.#pixelHeight);
  
          // Iterate through the map array and replace values with instances of Grass or Edge
          for (let y = 0; y < this.#height; y++) {
            for (let x = 0; x < this.#width; x++) {
              const cellValue = this.#mapArray[y][x];
              switch (cellValue) {
                case '1':
                  this.#mapArray[y][x] = this.#grass;
                  break;
                case '2':
                  this.#mapArray[y][x] = this.#edge;
                  break;
                case '3':
                  this.#mapArray[y][x] = this.#bottom_fence;
                  break;
                case '4':
                  this.#mapArray[y][x] = this.#bottom_left_fence;
                  break;
                case '5':
                  this.#mapArray[y][x] = this.#bottom_right_fence;
                  break;
                case '6':
                  this.#mapArray[y][x] = this.#top_left_fence;
                  break;
                case '7':
                  this.#mapArray[y][x] = this.#top_right_fence;
                  break;
                case '8':
                  this.#mapArray[y][x] = this.#left_fence;
                  break;
                case '9':
                  this.#mapArray[y][x] = this.#right_fence;
                  break;
                case 'a':
                  this.#mapArray[y][x] = this.#top_fence;
                  break;
                default:
                  // Handle other cases or unknown values
                  break;
              }
            }
          }

          for (let x = 0; x < this.#width; x++) {
            this.#pathfindingMap[x] = []; // Initialize inner arrays
            for (let y = 0; y < this.#height; y++) {
              if (this.getWalkthrough(x, y)) {
                this.#pathfindingMap[x].push(0); // Push 0 if walkable
              } else {
                this.#pathfindingMap[x].push(1); // Push 1 if not walkable
              }
            }
          }
          



  
          console.log("Map Array After Replacement:", this.#mapArray); // Check the map array after replacements
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

  drawTileUI(x,y)
  {

  }

  getPathFindingMap()
  {
    // 0 zombie can walk through, 1 it cannot
    return this.#pathfindingMap;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  // Returns true if you can walk through the tile
  getWalkthrough(x,y)
  {
    return this.#mapArray[y][x].canWalkThrough();

  }

  // Returns true if you can shoot through the tile
  getShootthrough(x,y)
  {

    return this.#mapArray[y][x].canShootThrough();

  }

  // Draws the visible section of the map
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

        let x_index = xindex + i;
        let y_index = yindex + j;

        let x_pos = x + i * 32;
        let y_pos = y + j * 32;

        if (x_index < this.#width && y_index < this.#height) {
          let tile = this.#mapArray[y_index][x_index];
          ctx.drawImage(tile.getSprite(), x_pos, y_pos);
        }
      }
    }
  }
}
