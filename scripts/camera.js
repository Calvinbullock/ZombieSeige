
export class Camera {
    #width;
    #height;
    #screenHeight = 140;
    #screenWidth = 256;
    
  
    constructor(width,height) {
        this.#height = height;
        this.#width = width;
  
    }
    getPlayerX(x)
    {
        return this.#screenWidth/2;
        
    }
    getPlayerY()
    {
        return this.#screenHeight/2;
    }
    getMapX(playerX)
    {
        return 0-(playerX%32);
    }
    getMapY(playerY)
    {
        return 0-(playerY%32);
    }

  }
  