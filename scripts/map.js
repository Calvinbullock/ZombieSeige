
export class Map {
  #path = "./assets/map.txt";
  #mapArray = [];
  #width = 20;
  #height = 20;
  #pixelWidth;
  #pixelHeight;
  #canvas;
  #grass = new Image();
  #edge = new Image();
  

  constructor() {
    this.#readMapFromFile();
    this.#canvas = document.querySelector("#myCanvas").getContext('2d');
    this.#grass.src = "./assets/green_grass.png"; // Set the source of the image
    this.#edge.src = "./assets/edge.png"; // Set the source of the image

  }

  #readMapFromFile() 
  {
    fetch(this.#path)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            this.#mapArray = rows.map(row => row.split(',').map(Number));
            this.#height = this.#mapArray.length;
            this.#width = this.#height > 0 ? this.#mapArray[0].length : 0;
            console.log("Map Array:", this.#mapArray);
            console.log("Width:", this.#width);
            console.log("Height:", this.#height);

            this.#pixelWidth = this.#width * 32;
            this.#pixelHeight = this.#height * 32;

            console.log(this.#pixelWidth);
            console.log(this.#pixelHeight);
            
        })
        .catch(error => {
            console.error('Error reading the map file:', error);
        });
  }


  getMapArray() {
    return this.#mapArray;
  }

  getWidth() {
    return this.#width *32;
  }

  getHeight() {
    return this.#height * 32;
  }

  draw(x, y, xindex, yindex) {
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


            // console.log(x_index);
            // console.log(y_index);

            // console.log(this.#mapArray);



          if (x_index < this.#width && y_index < this.#height)
          {
            let tile = this.#mapArray[y_index][x_index];
            
            if (tile == 1) {
              this.#canvas.drawImage(this.#grass, x_pos, y_pos);
            }
            if (tile == 2) {
              this.#canvas.drawImage(this.#edge, x_pos, y_pos);
            }
          }


          
        }
    }
}
}
