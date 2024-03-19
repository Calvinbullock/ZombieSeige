export class EventHandler {

    upKey = 'w';
    downKey = 's';
    leftKey = 'a';
    rightKey = 'd';
    reloadkey = 'r';
    gun1Key = '1';
    gun2Key = '2';
    spawnZombieKey = 'z';
    mouseButton;
    interactKey;
    movementSpeed = 1;

    movementInterval = null;

    // Handles when Keys are pressed
    handleKeyDown(event, player) {
        let key = event.key;
        if (event.repeat) return; // If the key is being held down and repeating, ignore the event

        switch (key) {
            case this.upKey:
              player.movingUp = true;
              break;
          
            case this.leftKey:
              player.movingLeft = true;
              break;
          
            case this.rightKey:
              player.movingRight = true;
              break;
          
            case this.downKey:
              player.movingDown = true;
              break;
          
            case this.reloadkey:
              player.reload();
              break;
          
            case this.gun1Key:
              player.switchActiveGun(1);
              break;
          
            case this.gun2Key:
              player.switchActiveGun(2);
              break;
          
            default: // Handle unexpected keys
              console.log(`Unrecognized key pressed: ${key}`); // Optional logging
              break;
          }
          
    }
    
    // Handles when keys are released
    handleKeyUp(event, player) {
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
    

    // Handles When mouse is clicked
    handleClick(event, game) {
        // sets the canvas to rect
        const rect = event.target.getBoundingClientRect();
        // gets the height and width of canvas
        const scaleX = event.target.width / rect.width;
        const scaleY = event.target.height / rect.height;
        // gets the mouse position by subtracting the canvas position from the mouse position
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

    
        game.player.shoot(game.bullets, mouseX, mouseY,game.getCamera());
    }

    // Sets the mouse position when it is moved
    setMousePosition(event, player) {
        // sets the canvas to rect
        const rect = event.target.getBoundingClientRect();
        // gets the height and width of canvas
        const scaleX = event.target.width / rect.width;
        const scaleY = event.target.height / rect.height;
        // gets the mouse position by subtracting the canvas position from the mouse position
        const mouseX = (event.clientX - rect.left) * scaleX;
        const mouseY = (event.clientY - rect.top) * scaleY;

        player.setMouseCoords(mouseX, mouseY);

        // console.log(mouseX, mouseY);
    }

}
