export class Tile {
    canwalk;
    canShoot;
    sprite;


    constructor(canWalk = true, canShootThrough = true,sprite) {
        this.canWalk = canWalk;
        this.canShoot= canShootThrough;
        this.sprite = new Image();
        this.sprite.src = sprite;
    }
    getSprite()
    {
        return this.sprite;
    }
    canWalkThrough()
    {
        return this.canWalk;
    }
    canShootThrough()
    {
        return this.canShoot;
    }
}
