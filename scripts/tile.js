export class Tile {
    canwalk;
    canShoot;
    sprite;
    store;
    invetory;

    constructor(canWalk = true, canShootThrough = true,sprite,store = false) {
        this.canWalk = canWalk;
        this.canShoot= canShootThrough;
        this.sprite = new Image();
        this.sprite.src = sprite;
        this.store = store;
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
    isStore()
    {
        return this.store;
    }
    draw(x,y)
    {

    }
}
