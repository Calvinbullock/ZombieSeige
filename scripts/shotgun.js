import { Gun } from "./gun.js";

export class Shotgun extends Gun {
    #duration;
    
    constructor() {
      super(50, "Shotgun", 1, 10, 3, "temp", "temp", "assets/shotgun.png",.32,12)

    }
  }
  