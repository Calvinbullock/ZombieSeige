import { Gun } from "./gun.js";

export class Shotgun extends Gun {
    #duration;
    
    constructor() {
      super(60, "Shotgun", 60, 10, 3, "temp", "temp", "assets/shotgun.png",.32,12,1)

    }
  }
  