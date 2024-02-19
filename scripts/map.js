
export class Map {
  #path = "./assets/map.txt";
  #mapArray = [];
  #width = 0;
  #height = 0;
  #canvas;
  #grass = new Image();
  

  constructor() {
    this.#readMapFromFile();
    this.#canvas = document.querySelector("#myCanvas").getContext('2d');
    this.#grass.src = "./assets/zombie_male.png"; // Set the source of the image
  }

  #readMapFromFile() 
  {
    fetch(this.#path)
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n');
            this.mapArray = rows.map(row => row.split(',').map(Number));
            this.height = this.mapArray.length;
            this.width = this.height > 0 ? this.mapArray[0].length : 0;
            console.log("Map Array:", this.mapArray);
            console.log("Width:", this.width);
            console.log("Height:", this.height);
        })
        .catch(error => {
            console.error('Error reading the map file:', error);
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
  
  draw(x, y) {
    for (let i = 0; i < 128; i+=32) {
        for (let j = 0; j < 128; j+=32) {
            // Perform some action or call some function here
            // For demonstration, let's log the coordinates
            this.#canvas.drawImage(this.#grass, i+x, j+y);
        }
    }
}
}
