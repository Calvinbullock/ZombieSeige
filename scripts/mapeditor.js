import { Grass } from "./grass.js";
import { Pit } from "./pit.js";
import { Wall } from "./wall.js";
import { AmmoCrate } from "./ammocrate.js";
import { HealthCrate } from "./healthcrate.js";
import { MysteryBox } from "./mysterybox.js";
import { Tarp } from "./tarp.js";
import { Water } from "./water.js";
import { UpgradeBench } from "./upgradebench.js";

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
    #pixelWidth;
    #pixelHeight;
    #grass = new Grass();
    #tempwall = new Wall("./assets/Wall.png");
    #pit = new Pit();
    #bottom_fence = new Wall("./assets/fence/fence_bottom.png");
    #bottom_left_fence = new Wall("./assets/fence/fence_corner_bottom_left.png");
    #bottom_right_fence = new Wall("./assets/fence/fence_corner_bottom_right.png");
    #top_left_fence = new Wall("./assets/fence/fence_corner_top_left.png");
    #top_right_fence = new Wall("./assets/fence/fence_corner_top_right.png");
    #left_fence = new Wall("./assets/fence/fence_left.png");
    #right_fence = new Wall("./assets/fence/fence_right.png");
    #top_fence = new Wall("./assets/fence/fence_top.png");
    #ammo_crate = new AmmoCrate();
    #health_crate = new HealthCrate();
    #mystery_crate = new MysteryBox();
  
    #bottom_left_tarp = new Tarp("./assets/tarp/tarp_bottom_left.png");
    #bottom_right_tarp = new Tarp("./assets/tarp/tarp_bottom_right.png");
    #top_left_tarp = new Tarp("./assets/tarp/tarp_top_left.png");
    #top_right_tarp = new Tarp("./assets/tarp/tarp_top_right.png");

    #textMap;
  
    #water = new Water();
    #upgradeBench = new UpgradeBench();
  
    
  
    #pathfindingMap = [];


    #tileX=0;
    #tileY=0;


    #selectedTile = this.#water;
    #selectedChar = 'w';


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
                case 'p':
                  this.#mapArray[y][x] = this.#pit;
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
                case 'c':
                  this.#mapArray[y][x] = this.#ammo_crate;
                  break;
                case 'h':
                  this.#mapArray[y][x] = this.#health_crate;
                  break;
                case 'm':
                  this.#mapArray[y][x] = this.#mystery_crate;
                  break;
                case 't':
                  this.#mapArray[y][x] = this.#bottom_left_tarp;
                  break;
                case 'y':
                  this.#mapArray[y][x] = this.#bottom_right_tarp;
                  break;
                case 'g':
                  this.#mapArray[y][x] = this.#top_left_tarp;
                  break;
                case 'l':
                  this.#mapArray[y][x] = this.#top_right_tarp;
                  break;
                case 'w':
                  this.#mapArray[y][x] = this.#water;
                  break;
                case 'u':
                  this.#mapArray[y][x] = this.#upgradeBench;
                  break;
                case '$':
                  this.#mapArray[y][x] = this.#tempwall;
                  break;
                default:
                  // Handle other cases or unknown values
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

        case '1':
            this.#selectedTile = this.#grass;
            this.#selectedChar = '1';
            break;    
        case 'p':
          this.#selectedTile = this.#pit;
          this.#selectedChar = 'p';
          break;
        case '3':
          this.#selectedTile = this.#bottom_fence;
          this.#selectedChar = '3';
          break;  
        case '$':
          this.#selectedTile = this.#tempwall;
          this.#selectedChar = '$';
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
        
    }




};



let map = new mapEditor();



map.loadMap().then(() => {
    console.log("map loaded")
  

    console.log("Game loaded")
  

  
    document.addEventListener("keydown", (event) => {
      map.handleKey(event);
    });

    document.querySelector("#canvas").addEventListener("mousedown", (event) => {
        map.click(event);
      });


    map.drawMap();

    document.querySelector("#saveMapBtn").addEventListener("click", () => {
      map.writeMap();
    });
  
    

  });