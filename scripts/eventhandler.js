export class EventHandler {

    upKey = 'w';
    downKey = 's';
    leftKey = 'a';
    rightKey = 'd';
    reloadkey = 'r';
    spawnZombieKey = 'z';
    mouseButton;
    interactKey;
    movementSpeed = 1;

    movementInterval = null;

    handleKeyDown(event, player, game) {
        let key = event.key;
        if (event.repeat) return; // If the key is being held down and repeating, ignore the event

        if (key == this.upKey)
        {
            player.movingUp = true;
        }

        if (key == this.leftKey)
        {
            player.movingLeft = true;
        }

        if (key == this.rightKey)
        {
            player.movingRight = true;
        }

        if (key == this.downKey)
        {
            player.movingDown = true;
        }
        if (key == this.reloadkey)
        {
            player.reload()
        }
        if (key == this.spawnZombieKey)
        {
            game.spawnZombies();
        }

    }
    
    handleKeyUp(event,player) {
        let key = event.key;
        if (event.repeat) return; // If the key is being held down and repeating, ignore the event

        if (key == this.upKey)
        {
            player.movingUp = false;
        }

        if (key == this.leftKey)
        {
            player.movingLeft = false;
        }

        if (key == this.rightKey)
        {
            player.movingRight = false;
        }

        if (key == this.downKey)
        {
            player.movingDown = false;
        }

    }
    


    handleClick(event, game) {
        const rect = event.target.getBoundingClientRect();
        const scaleX = event.target.width / rect.width;
        const scaleY = event.target.height / rect.height;
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

    
        game.player.shoot(game.bullets, mouseX, mouseY,game.getCamera());
      }
    handleFrameClock() {}

}
