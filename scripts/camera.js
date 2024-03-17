export class Camera 
{
  #pixelWidth;
  #pixelHeight;
  #screenHeight = 128;
  #screenWidth = 256;
  #halfScreenWidth;
  #rightSide;
  #halfScreenHeight;
  #bottomSide;
  canvas;

  #tileWidth;
  #tileHeight;

  constructor(width, height) {
    // this.#pixelHeight = height;
    // this.#pixelWidth = width;

    this.#tileWidth = width;
    this.#tileHeight = height;

    this.#pixelWidth  = width * 32;
    this.#pixelHeight = height * 32;

    console.log(this.#pixelHeight);

    this.#halfScreenWidth = this.#screenWidth / 2;
    this.#rightSide = this.#pixelWidth - this.#halfScreenWidth;

    this.#halfScreenHeight = this.#screenHeight / 2;
    this.#bottomSide = this.#pixelHeight - this.#halfScreenHeight;

    this.canvas = document.querySelector("#myCanvas").getContext("2d");
  }

  // gets the y screen position of the player
  getPlayerScreenPositionX(x) {
    if (x < this.#halfScreenWidth) {
      return x;
    }
    if (x > this.#rightSide) {
      let xpos = this.#halfScreenWidth + (x - this.#rightSide);
      return xpos;
    }

    return this.#halfScreenWidth;
  }

  // Gets the x screen position of the player
  getPlayerScreenPositionY(y) {
    if (y < this.#halfScreenHeight) {
      return y;
    }
    if (y > this.#bottomSide) {
      let ypos = this.#halfScreenHeight + (y - this.#bottomSide);
      return ypos;
    }

    return this.#halfScreenHeight;
  }

  // gets the X position that the left column of tiles start drawing on.
  getMapScreenPositionX(playerX)
  {
        if (playerX < this.#halfScreenWidth)
        {
            return 0.0;
        }
        if (playerX > this.#rightSide)
        {
            return 0.0;
        }
        return -1.0 * (playerX % 32.0);
  }
  
  // gets the Y position that the top row of tiles start drawing on.
  getMapScreenPositionY(playerY)
  {
    if (playerY < this.#halfScreenHeight)
    {
        return 0.0;
    }
    if (playerY > this.#bottomSide)
    {
        return 0.0;
    }
    return -1.0 * (playerY % 32.0);
  }

  // Returns the left X index for drawing the map
  getMapXIndex(playerX)
  {
      if (playerX < this.#halfScreenWidth)
      {
          return 0;
      }
      let x = Math.floor(playerX/32-4);
      if (x > this.#tileWidth-8)
      {
          x = this.#tileWidth-8;
      }
      return x;
      
  }
  // Returns the top Y index for drawing the map
  getMapYIndex(playerY)
  {
      if (playerY < this.#halfScreenHeight)
      {
          return 0;
      }

      let y = Math.floor(playerY/32-2);
      
      if (y > this.#tileHeight-4)
      {
        y = this.#tileHeight-4;
      }
      return y;
      
  }
  // Gets the screen X position for an item should work for both bullets and zombies.
  getObjectScreenPositionX(playerX,objectX)
  {


    let playerScreenX = this.getPlayerScreenPositionX(playerX);

    let entityScreenX = playerScreenX - (playerX - objectX );


    return entityScreenX;

  }

  // Gets the screen Y position for an item should work for both bullets and zombies.
  getObjectScreenPositionY(playerY,objectY)
  {
    let playerScreenY = this.getPlayerScreenPositionY(playerY);

    let entityScreenY = playerScreenY - (playerY - objectY);

    return entityScreenY;

  }
  getCanvas()
  {
    return this.canvas;
  }
  clearScreen()
  {
    this.canvas.clearRect(0, 0, 256, 128);
  }

}
  