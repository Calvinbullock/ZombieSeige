export class Tile {
    canwalk;
    canShoot;
    sprite;
    interactable;

    constructor(canWalk = true, canShootThrough = true,sprite,interactable = false) {
        this.canWalk = canWalk;
        this.canShoot= canShootThrough;
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.interactable = interactable;
    }

    // Returns the image of the tile
    getSprite()
    {
        return this.sprite;
    }

    // Returns true if the tile is can be walked through
    canWalkThrough()
    {
        return this.canWalk;
    }

    // Returns true if the tile is can be shot through
    canShootThrough()
    {
        return this.canShoot;
    }

    // Returns true if the tile is a store tile
    isInteractable()
    {
        return this.interactable;
    }
    draw(x,y,camera)
    {
        let ctx = camera.getCanvas();
        ctx.drawImage(this.sprite, x, y);
    }
    isWater()
    {
        return false;
    }
}
