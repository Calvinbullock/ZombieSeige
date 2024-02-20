
export class Camera {
    #pixelWidth = 640;
    #pixelHeight = 640;
    #screenHeight = 128;
    #screenWidth = 256;
    #halfScreenWidth;
    #rightSide;

    #halfScreenHeight;
    #bottomSide;
  
    constructor(width,height) {
        // this.#pixelHeight = height;
        // this.#pixelWidth = width;
        console.log(this.#pixelHeight);

        this.#halfScreenWidth = this.#screenWidth/2;
        this.#rightSide = this.#pixelWidth - this.#halfScreenWidth;

        this.#halfScreenHeight = this.#screenHeight/2;
        this.#bottomSide = this.#pixelHeight - this.#halfScreenHeight;
  
    }
    getPlayerX(x)
    {
        if (x < this.#halfScreenWidth)
        {
            return x;
        }
        if (x > this.#rightSide)
        {
            let xpos = this.#halfScreenWidth + (x - this.#rightSide);
            console.log(xpos);
            return xpos;
        }

        return this.#halfScreenWidth;
        
    }
    getPlayerY(y)
    {
        if (y < this.#halfScreenHeight)
        {
            return y;
        }
        if (y > this.#bottomSide)
        {
            let ypos = this.#halfScreenHeight + (y - this.#bottomSide);
            return ypos;
        }

        return this.#halfScreenHeight;
        
    }

    getMapX(playerX)
    {
        if (playerX < this.#halfScreenWidth)
        {
            return 0;
        }
        if (playerX > this.#rightSide)
        {
            return 0;
        }
        return 0-(playerX%32);
    }
    getMapY(playerY)
    {
        if (playerY < this.#halfScreenHeight)
        {
            return 0;
        }
        if (playerY > this.#bottomSide)
        {
            return 0;
        }
        return 0-(playerY%32);
    }
    getMapXIndex(playerX)
    {
        if (playerX < this.#halfScreenWidth)
        {
            return 0;
        }
        let x = Math.floor(playerX/32-4);
        if (x > 12)
        {
            x = 12;
        }
        return x;
        
    }
    getMapYIndex(playerY)
    {
        if (playerY < this.#halfScreenHeight)
        {
            return 0;
        }
        let y = Math.floor(playerY/32-2);
        if (y > 16)
        {
            y = 16;
        }
        return y;
        
    }

  }
  