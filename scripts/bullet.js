export class Bullet{
  #duration;
  posX;
  posY;
  speed = 1;
  angle;

  constructor(duration_in,x,y,angle) {
    this.#duration = duration_in;
    this.posX = x;
    this.posY = y;
    this.angle = angle;
  }
  move()
  {
    this.posX += Math.cos(this.angle) * this.speed;
    this.posY += Math.sin(this.angle) * this.speed;
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
