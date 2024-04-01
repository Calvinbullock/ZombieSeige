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

class cam
{
    getCanvas()
    {
        return document.querySelector("canvas").getContext("2d");
    }
};


class mapEditor
{
    #path = "./assets/newmap.txt";
    #mapArray = [];
    #width;
    #height;



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

    // floors
    #grass = new Floor("./assets/floors/green_grass.png");
    #woodFloor = new Floor("./assets/floors/woodfloor.png");


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

    
    #textMap;

  
    
  
    #pathfindingMap = [];


    #tileX=0;
    #tileY=0;


    #selectedTile = this.#leftFence;
    #selectedChar = '3';


  // Loads the map from a text file
  
  loadMap() {
    return new Promise((resolve, reject) => {
      fetch(this.#path)
        .then((response) => response.text())
        .then((data) => {
          const rows = data.trim().split("\n");
          this.#mapArray = rows.map((row) => row.split(","));
          this.#textMap = rows.map((row) => row.split(","));

          console.log("Map Array:", this.#mapArray);
  
          this.#height = this.#mapArray.length;
          this.#width = this.#height > 0 ? this.#mapArray[0].length : 0;
          console.log("Map Array:", this.#mapArray);
          console.log("Width:", this.#width);
          console.log("Height:", this.#height);
  


         

  
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
                    
                default:
                    // Handle default case if needed
                    break;
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

  writeMap() {
    const rows = this.#textMap.map(row => row.join(',')).join('\n');
    const blob = new Blob([rows], { type: 'text/plain' });

    // Save the blob to a file
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output.txt'; // Set the filename as needed
    link.click();

    URL.revokeObjectURL(link.href);
  }


    drawMap()
    {
        let ctx = document.querySelector("canvas").getContext("2d");
        let camera = new cam();
        ctx.clearRect(0, 0, 1000, 500);

        for (let i = 0; i < this.#width; i++) {
            for (let j = 0; j < this.#height; j++) {
      
              let x_index = this.#tileX + i;
              let y_index = this.#tileY + j;
      
              let x_pos = (x_index - this.#tileX) * 32;
              let y_pos = (y_index - this.#tileY) * 32;
      
              if (x_index < this.#width && y_index < this.#height) {
                let tile = this.#mapArray[y_index][x_index];
                tile.draw(x_pos,y_pos,camera);
              }
            }
          }
    }


    handleKey(event){
    let key = event.key;
    if (event.repeat) return; // If the key is being held down and repeating, ignore the event

    switch (key) {
        case 'ArrowUp':
            if (this.#tileY != 0) {
                this.#tileY -= 1;
            }
            break;
    
        case 'ArrowLeft':
            if (this.#tileX != 0) {
                this.#tileX -= 1;
            }
            break;
    
        case 'ArrowDown':
            this.#tileY += 1;
            break;
    
        case 'ArrowRight':
            this.#tileX += 1;
            break;
        case '3':
          this.#selectedTile = this.#leftFence;
          this.#selectedChar = '3';
          break;
        case '4':
          this.#selectedTile = this.#rightFence;
          this.#selectedChar = '4';
          break;
        case '5':
          this.#selectedTile = this.#topFence;
          this.#selectedChar = '5';
          break;
        case '6':
          this.#selectedTile = this.#bottomFence;
          this.#selectedChar = '6';
          break;
        case '7':
          this.#selectedTile = this.#topRightFence;
          this.#selectedChar = '7';
          break;
        case '8':
          this.#selectedTile = this.#topLeftFence
          this.#selectedChar = '8';
          break;
        case '9':
          this.#selectedTile = this.#bottomRightFence;
          this.#selectedChar = '9';
          break;
        case '0':
          this.#selectedTile = this.#bottomLeftFence;
          this.#selectedChar = '0';
          break;
        case '-':
          this.#selectedTile = this.#houseWall4Corners;
          this.#selectedChar = '-';
          break;
        case '=':
          this.#selectedTile = this.#houseWallBottomLeft;
          this.#selectedChar = '=';
          break;
        case 'q':
          this.#selectedTile = this.#houseWallBottomRight;
          this.#selectedChar = 'q';
          break;
        case 'w':
          this.#selectedTile = this.#houseWallTopLeft;
          this.#selectedChar = 'w';
          break;
        case 'e':
          this.#selectedTile = this.#houseWallTopRight;
          this.#selectedChar = 'e';
          break;
        case 'r':
          this.#selectedTile = this.#houseWallHorizontal;
          this.#selectedChar = 'r';
          break;
        case 't':
          this.#selectedTile = this.#houseWallVertical;
          this.#selectedChar = 't';
          break;
        case 'y':
          this.#selectedTile = this.#houseWallDownT;
          this.#selectedChar = 'y';
          break;
        case 'u':
          this.#selectedTile = this.#houseWallLeftT;
          this.#selectedChar = 'u';
          break;
        case 'i':
          this.#selectedTile = this.#houseWallRightT;
          this.#selectedChar = 'i';
          break;
        case 'o':
          this.#selectedTile = this.#houseWallUpT;
          this.#selectedChar = 'o';
          break;
        case 'p':
          this.#selectedTile = this.#stoneWall4Corners;
          this.#selectedChar = 'p';
          break;
        case '[':
          this.#selectedTile = this.#stoneWallBottomLeft;
          this.#selectedChar = '[';
          break;
        case ']':
          this.#selectedTile = this.#stoneWallBottomRight;
          this.#selectedChar = ']';
          break;
        case '\\':
          this.#selectedTile = this.#stoneWallTopLeft;
          this.#selectedChar = '\\';
          break;
        case 'a':
          this.#selectedTile = this.#stoneWallTopRight;
          this.#selectedChar = 'a';
          break;
        case 's':
          this.#selectedTile = this.#stoneWallHorizontal;
          this.#selectedChar = 's';
          break;
        case 'd':
          this.#selectedTile = this.#stoneWallVertical;
          this.#selectedChar = 'd';
          break;
        case 'f':
          this.#selectedTile = this.#stoneWallDownT;
          this.#selectedChar = 'f';
          break;
        case 'g':
          this.#selectedTile = this.#stoneWallLeftT;
          this.#selectedChar = 'g';
          break;
        case 'h':
          this.#selectedTile = this.#stoneWallRightT;
          this.#selectedChar = 'h';
          break;
        case 'j':
          this.#selectedTile = this.#stoneWallUpT;
          this.#selectedChar = 'j';
          break;
        case 'l':
          this.#selectedTile = this.#grass;
          this.#selectedChar = 'l';
          break;
        case ';':
          this.#selectedTile = this.#woodFloor;
          this.#selectedChar = ';';
          break;
        case 'W':
          this.#selectedTile = this.#water;
          this.#selectedChar = 'W';
          break;
        case 'P':
          this.#selectedTile = this.#pit;
          this.#selectedChar = 'P';
          break;
        case 'A':
          this.#selectedTile = this.#ammo_crate;
          this.#selectedChar = 'A';
          break;    
        case 'H':
          this.#selectedTile = this.#health_crate
          this.#selectedChar = 'H';
          break;  
        case 'M':
          this.#selectedTile = this.#mystery_crate;
          this.#selectedChar = 'M';
          break;  
        case 'U':
          this.#selectedTile = this.#upgradeBench;
          this.#selectedChar = 'U';
          break;  
        case 'z':
          this.#selectedTile = this.#top_right_tarp;
          this.#selectedChar = 'z';
          break;  
        case '`':
          this.#selectedTile = this.#top_left_tarp;
          this.#selectedChar = '`';
          break;  
        case '1':
          this.#selectedTile = this.#bottom_right_tarp;
          this.#selectedChar = '1';
          break;  
        case '2':
          this.#selectedTile = this.#bottom_left_tarp;
          this.#selectedChar = '2';
          break;  

          


    }
    

      this.drawMap();
    }


    click(event)
    {
        // sets the canvas to rect
        const rect = event.target.getBoundingClientRect();
        // gets the height and width of canvas
        const scaleX = event.target.width / rect.width;
        const scaleY = event.target.height / rect.height;
        // gets the mouse position by subtracting the canvas position from the mouse position
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;


        let selectedTileX = Math.floor(mouseX/32)+this.#tileX;
        let selectedTileY = Math.floor(mouseY/32)+this.#tileY;


        console.log("Clicked tile: " + selectedTileX + " " + selectedTileY);


        this.#mapArray[selectedTileY][selectedTileX] = this.#selectedTile;

        this.#textMap[selectedTileY][selectedTileX] = this.#selectedChar;


        map.drawMap();

        console.log(this.#textMap);
        console.log(this.#selectedChar)
        
    }
    rightClickTileSelect(event)
    {
      // sets the canvas to rect
      const rect = event.target.getBoundingClientRect();
      // gets the height and width of canvas
      const scaleX = event.target.width / rect.width;
      const scaleY = event.target.height / rect.height;
      // gets the mouse position by subtracting the canvas position from the mouse position
      const mouseX = (event.clientX - rect.left) * scaleX;
      const mouseY = (event.clientY - rect.top) * scaleY;


      let selectedTileX = Math.floor(mouseX/32)+this.#tileX;
      let selectedTileY = Math.floor(mouseY/32)+this.#tileY;


      console.log("Clicked tile: " + selectedTileX + " " + selectedTileY);
      console.log(this.#selectedChar)
      console.log(this.#textMap[selectedTileY][selectedTileX]);

      this.#selectedChar = this.#textMap[selectedTileY][selectedTileX];

      console.log(this.#selectedChar)
      this.#selectedTile = this.#mapArray[selectedTileY][selectedTileX];

    }




};



let map = new mapEditor();



map.loadMap().then(() => {
    console.log("map loaded")
  

    console.log("Game loaded")
  
    // Makes sure arrow keys dont scroll down the web page
    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
      }
    })
      
    
  
    document.addEventListener("keydown", (event) => {
      map.handleKey(event);
    });

    document.querySelector("#canvas").addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        // Your custom code for handling the left-click event
        map.click(event);
     }
        
      });
      

      document.querySelector("#canvas").addEventListener('contextmenu', function(event) {
        // Prevent the default right-click menu from appearing
        event.preventDefault();
    
        console.log("Right click")
        map.rightClickTileSelect(event);
    });


    map.drawMap();

    document.querySelector("#saveMapBtn").addEventListener("click", () => {
      map.writeMap();
    });
  
    

  });