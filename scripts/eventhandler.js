export class EventHandler {

    upKey = 'w';
    downKey = 's';
    leftKey = 'a';
    rightKey = 'd';
    mouseButton;
    interactKey;
    movementSpeed = 2;

    movementInterval = null;
    keysPressed = {};

    handleKeyDown(event, player) {
        if (event.repeat) return; // If the key is being held down and repeating, ignore the event
        this.keysPressed[event.key] = true;
        this.startMovement(player);
    }
    
    handleKeyUp(event) {
        delete this.keysPressed[event.key];
        if (Object.keys(this.keysPressed).length === 0) {
            this.stopMovement();
        }
    }
    
    startMovement(player) {
        if (!this.movementInterval) {
            this.movementInterval = setInterval(() => {
                let dx = 0;
                let dy = 0;
    
                if (this.keysPressed[this.upKey]) {
                    dy -= this.movementSpeed;
                }
                if (this.keysPressed[this.downKey]) {
                    dy += this.movementSpeed;
                }
                if (this.keysPressed[this.leftKey]) {
                    dx -= this.movementSpeed;
                }
                if (this.keysPressed[this.rightKey]) {
                    dx += this.movementSpeed;
                }
    
                // Normalize movement speed
                if (dx !== 0 && dy !== 0) {
                    // Calculate the diagonal movement speed
                    let diagonalSpeed = Math.sqrt(Math.pow(this.movementSpeed, 2) / 2);
                    dx = Math.sign(dx) * diagonalSpeed;
                    dy = Math.sign(dy) * diagonalSpeed;
                }
    
                player.moveBy(dx, dy);
            }, 1000 / 60); // Update every frame
        }
    }
    
    stopMovement() {
        clearInterval(this.movementInterval);
        this.movementInterval = null;
    }

    handleClick() {}
    handleFrameClock() {}

}
