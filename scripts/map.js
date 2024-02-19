
export class Map {
  #path = "./assets/map.txt";
  #mapArray = [];
  #width = 0;
  #height = 0;
  #pixelWidth;
  #pixelHeight;
  #canvas;
  #grass = new Image();
  

  constructor() {
    this.#readMapFromFile();
    this.#canvas = document.querySelector("#myCanvas").getContext('2d');
    this.#grass.src = "./assets/temp_grass.png"; // Set the source of the image

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
    return this.#pixelWidth;
  }

  getHeight() {
    return this.#pixelHeight;
  }

  draw(x, y) {
    for (let i = 0; i < 288; i+=32) {
        for (let j = 0; j < 192; j+=32) {
            // Perform some action or call some function here
            // For demonstration, let's log the coordinates
            let x_index = Math.trunc((x+i)/32);
            let y_index = Math.trunc((y+j)/32);

            // console.log(x_index);
            // console.log(y_index);

            // console.log(this.#mapArray);




          let tile = this.#mapArray[x_index][y_index];
          
          if (tile == 1) {
              this.#canvas.drawImage(this.#grass, i+x, j+y);
          }

          
        }
    }
}
}
