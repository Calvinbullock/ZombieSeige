import { Gun } from "./gun.js";

export class Sniper extends Gun {
    #duration;
    
    constructor() {
      super(60, "sniper", 100, 50, 1, "temp", "temp", "assets/guns/sniper_left.png", "assets/guns/sniper_right.png",.01,12,0,4,4)

    }
  }
  