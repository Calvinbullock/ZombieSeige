export class Tile {
    canwalk;
    canShoot;
    sprite;
    storel


    constructor(canWalk = true, canShootThrough = true,sprite,store = false) {
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
