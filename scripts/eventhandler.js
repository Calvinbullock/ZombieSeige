export class EventHandler 
{

    upKey = 'w';
    downKey = 's';
    leftKey = 'a';
    rightKey = 'd';
    mouseButton;
    interactKey;
   
   
    handleKeys(keyPressed, player) {
      if (keyPressed.key === this.upKey) {
          player.moveBy(0, -2); // Assuming moving up decrements the y-coordinate
      } else if (keyPressed.key === this.downKey) {
          player.moveBy(0, 2); // Assuming moving down increments the y-coordinate
      } else if (keyPressed.key === this.leftKey) {
          player.moveBy(-2, 0); // Assuming moving left decrements the x-coordinate
      } else if (keyPressed.key === this.rightKey) {
          player.moveBy(2, 0); // Assuming moving right increments the x-coordinate
      }
  }
     handleClick() {}
     handleFrameClock() {}
   
   }
   
   