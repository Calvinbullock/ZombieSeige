import { Grass } from "./grass.js";
import { Pit } from "./pit.js";
import { Wall } from "./wall.js";
import { AmmoCrate } from "./ammocrate.js";
import { HealthCrate } from "./healthcrate.js";
import { MysteryBox } from "./mysterybox.js";
import { Tarp } from "./tarp.js";
import { Water } from "./water.js";
import { UpgradeBench } from "./upgradebench.js";
import { Floor } from "./floor.js";

export class Map {
  #path = "./assets/newmap.txt";
  #mapArray = [];
  #width;
  #height;
  #pixelWidth;
  #pixelHeight;


  // walls
  #leftFence = new Wall("./assets/fence/fence_right.png");
  #rightFence = new Wall("./assets/fence/fence_left.png");
  #topFence = new Wall("./assets/fence/fence_bottom.png");
  #bottomFence = new Wall("./assets/fence/fence_top.png");
  #topRightFence = new Wall("./assets/fence/fence_corner_bottom_left.png");
  #topLeftFence = new Wall("./assets/fence/fence_corner_bottom_right.png");
  #bottomRightFence = new Wall("./assets/fence/fence_corner_top_left.png");
  #bottomLeftFence = new Wall("./assets/fence/fence_corner_top_right.png");
  #houseWall4Corners = new Wall("./assets/walls/houseWall_4_corner.png");
  #houseWallBottomLeft = new Wall("./assets/walls/houseWall_corner_NE.png");
  #houseWallBottomRight = new Wall("./assets/walls/houseWall_corner_NW.png");
  #houseWallTopLeft = new Wall("./assets/walls/houseWall_corner_SE.png");
  #houseWallTopRight = new Wall("./assets/walls/houseWall_corner_SW.png");
  #houseWallHorizontal = new Wall("./assets/walls/houseWall_EW.png");
  #houseWallVertical = new Wall("./assets/walls/houseWall_NS.png");
  #houseWallDownT = new Wall("./assets/walls/houseWall_t_down.png");
  #houseWallLeftT = new Wall("./assets/walls/houseWall_t_left.png");
  #houseWallRightT = new Wall("./assets/walls/housewall_t_right.png");
  #houseWallUpT = new Wall("./assets/walls/houseWall_t_up.png");
  #stoneWall4Corners = new Wall("./assets/walls/stonewall_4_corner.png");
  #stoneWallBottomLeft = new Wall("./assets/walls/stonewall_corner_NE.png");
  #stoneWallBottomRight = new Wall("./assets/walls/stonewall_corner_NW.png");
  #stoneWallTopLeft = new Wall("./assets/walls/stonewall_corner_SE.png");
  #stoneWallTopRight = new Wall("./assets/walls/stonewall_corner_SW.png");
  #stoneWallHorizontal = new Wall("./assets/walls/stonewall_EW.png");
  #stoneWallVertical = new Wall("./assets/walls/stonewall_NS.png");
  #stoneWallDownT = new Wall("./assets/walls/stonewall_t_down.png");
  #stoneWallLeftT = new Wall("./assets/walls/stonewall_t_left.png");
  #stoneWallRightT = new Wall("./assets/walls/stonewall_t_right.png");
  #stoneWallUpT = new Wall("./assets/walls/stonewall_t_up.png");
  #cabinWallBottomLeft = new Wall("./assets/walls/cabinWall_corner_NE.png");
  #cabinWallBottomRight = new Wall("./assets/walls/cabinWall_corner_NW.png");
  #cabinWallTopLeft = new Wall("./assets/walls/cabinWall_corner_SE.png");
  #cabinWallTopRight = new Wall("./assets/walls/cabinWall_corner_SW.png");
  #cabinWallHorizontal = new Wall("./assets/walls/cabinWall_EW.png");
  #cabinWallVertical = new Wall("./assets/walls/cabinWall_NS.png");

  // floors
  #grass = new Floor("./assets/floors/green_grass.png");
  #woodFloor = new Floor("./assets/floors/woodfloor.png");

  #bridgeTop = new Floor("./assets/floors/bridgefloor_top.png");
  #bridgeBottom = new Floor("./assets/floors/bridgefloor_bottom.png");


  // Special Tiles
  #ammo_crate = new AmmoCrate();
  #health_crate = new HealthCrate();
  #mystery_crate = new MysteryBox();

  #bottom_left_tarp = new Tarp("./assets/tarp/tarp_bottom_left.png");
  #bottom_right_tarp = new Tarp("./assets/tarp/tarp_bottom_right.png");
  #top_left_tarp = new Tarp("./assets/tarp/tarp_top_left.png");
  #top_right_tarp = new Tarp("./assets/tarp/tarp_top_right.png");

  #water = new Water();
  #pit = new Pit();
  #upgradeBench = new UpgradeBench();


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
                case '3':
                    this.#mapArray[y][x] = this.#leftFence;
                    break;
                case '4':
                    this.#mapArray[y][x] = this.#rightFence;
                    break;
                case '5':
                    this.#mapArray[y][x] = this.#topFence;
                    break;
                case '6':
                    this.#mapArray[y][x] = this.#bottomFence;
                    break;
                case '7':
                    this.#mapArray[y][x] = this.#topRightFence;
                    break;
                case '8':
                    this.#mapArray[y][x] = this.#topLeftFence;
                    break;
                case '9':
                    this.#mapArray[y][x] = this.#bottomRightFence;
                    break;
                case '0':
                    this.#mapArray[y][x] = this.#bottomLeftFence;
                    break;
                case '-':
                    this.#mapArray[y][x] = this.#houseWall4Corners;
                    break;
                case '=':
                    this.#mapArray[y][x] = this.#houseWallBottomLeft;
                    break;
                case 'q':
                    this.#mapArray[y][x] = this.#houseWallBottomRight;
                    break;
                case 'w':
                    this.#mapArray[y][x] = this.#houseWallTopLeft;
                    break;
                case 'e':
                    this.#mapArray[y][x] = this.#houseWallTopRight;
                    break;
                case 'r':
                    this.#mapArray[y][x] = this.#houseWallHorizontal;
                    break;
                case 't':
                    this.#mapArray[y][x] = this.#houseWallVertical;
                    break;
                case 'y':
                    this.#mapArray[y][x] = this.#houseWallDownT;
                    break;
                case 'u':
                    this.#mapArray[y][x] = this.#houseWallLeftT;
                    break;
                case 'i':
                    this.#mapArray[y][x] = this.#houseWallRightT;
                    break;
                case 'o':
                    this.#mapArray[y][x] = this.#houseWallUpT;
                    break;
                case 'p':
                    this.#mapArray[y][x] = this.#stoneWall4Corners;
                    break;
                case '[':
                    this.#mapArray[y][x] = this.#stoneWallBottomLeft;
                    break;
                case ']':
                    this.#mapArray[y][x] = this.#stoneWallBottomRight;
                    break;
                case '\\':
                    this.#mapArray[y][x] = this.#stoneWallTopLeft;
                    break;
                case 'a':
                    this.#mapArray[y][x] = this.#stoneWallTopRight;
                    break;
                case 's':
                    this.#mapArray[y][x] = this.#stoneWallHorizontal;
                    break;
                case 'd':
                    this.#mapArray[y][x] = this.#stoneWallVertical;
                    break;
                case 'f':
                    this.#mapArray[y][x] = this.#stoneWallDownT;
                    break;
                case 'g':
                    this.#mapArray[y][x] = this.#stoneWallLeftT;
                    break;
                case 'h':
                    this.#mapArray[y][x] = this.#stoneWallRightT;
                    break;
                case 'j':
                    this.#mapArray[y][x] = this.#stoneWallUpT;
                    break;
                case 'l':
                  this.#mapArray[y][x] = this.#grass;
                  break;
                case ';':
                    this.#mapArray[y][x] = this.#woodFloor;
                    break;
                case 'W':
                  this.#mapArray[y][x] = this.#water;
                  break;
                case 'P':
                  this.#mapArray[y][x] = this.#pit;
                  break;
                case 'A':
                  this.#mapArray[y][x] = this.#ammo_crate;
                  break;    
                case 'H':
                  this.#mapArray[y][x] = this.#health_crate;
                  break;  
                case 'M':
                  this.#mapArray[y][x] = this.#mystery_crate;
                  break;  
                case 'U':
                  this.#mapArray[y][x] = this.#upgradeBench;
                  break;  
                case 'z':
                  this.#mapArray[y][x] = this.#top_right_tarp;
                  break;  
                case '`':
                  this.#mapArray[y][x] = this.#top_left_tarp;
                  break;  
                case '1':
                  this.#mapArray[y][x] = this.#bottom_right_tarp;
                  break;  
                case '2':
                  this.#mapArray[y][x] = this.#bottom_left_tarp;
                  break;  
                case 'x':
                  this.#mapArray[y][x] = this.#cabinWallBottomLeft;
                  break;
                case 'c':
                    this.#mapArray[y][x] = this.#cabinWallBottomRight;
                    break;
                case 'v':
                    this.#mapArray[y][x] = this.#cabinWallTopLeft;
                    break;
                case 'b':
                    this.#mapArray[y][x] = this.#cabinWallTopRight;
                    break;
                case 'n':
                    this.#mapArray[y][x] = this.#cabinWallHorizontal;
                    break;
                case 'm':
                    this.#mapArray[y][x] = this.#cabinWallVertical;
                    break;   
                case '.':
                  this.#mapArray[y][x] = this.#bridgeTop;
                  break;
                case '/':
                    this.#mapArray[y][x] = this.#bridgeBottom;
                    break;  
                default:
                    // Handle default case if needed
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

  getIsShop(x,y)
  {
    return this.#mapArray[y][x].isStore();
  }
  drawTileUI(camera,player)
  {
    let tileX = player.getTileX(5);
    let tileY = player.getTileY(5);
    let tile = this.#mapArray[tileY][tileX];

    if (tile.isInteractable(tileX,tileY))
    {
      
      tile.drawUI(camera)

      let cost = tile.getCost();

      // console.log(cost)
    }
  }

  getIsWater(x,y)
  {
    return this.#mapArray[y][x].isWater();
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
          tile.draw(x_pos,y_pos,camera);
        }
      }
    }
  }
}
