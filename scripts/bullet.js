export class Bullet{
  #duration;
  posX;
  posY;
  speed = 1;
  angle;
  time = 0;
  alive = true;
  damage;

  constructor(duration_in,x,y,angle,damage,speed) {
    this.#duration = duration_in;
    this.posX = x;
    this.posY = y;
    this.angle = angle;
    this.damage = damage;
    this.speed = speed;
  }
  getDamage()
  {
    if (this.alive)
    {
      return this.damage;
    }
    return 0;
    
  }
  getRadius()
  {
    return 1;
  }
  getX()
  {
    return this.posX;
  }
  getY()
  {
    return this.posY;
  }
  getTileX()
  {
    return Math.floor(this.posX/32);
  }
  getTileY()
  {
    return Math.floor(this.posY/32);
  }
  move()
  {
    this.posX += Math.cos(this.angle) * this.speed;
    this.posY += Math.sin(this.angle) * this.speed;
    this.time +=.15;
    if (this.time > this.#duration)
    {
      this.alive = false;
    }
  }
  getStatus()
  {
    return this.alive;
  }
  kill()
  {
    this.alive = false;
  }
  draw(camera,player)
  {
    let ctx = camera.getCanvas();
    ctx.fillStyle = "#000000";
    ctx.beginPath();

    let x = camera.getObjectScreenPositionX(player.getX(),this.posX)
    let y = camera.getObjectScreenPositionY(player.getY(),this.posY)


    ctx.arc(x,y, 1, 0, 2 * Math.PI);
    ctx.fill();



  }
}
