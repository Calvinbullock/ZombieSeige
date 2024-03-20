import { Gun } from "./gun.js";

export class Rifle extends Gun {
    #duration;
    
    constructor() {
      super(240, "rifle", 30, 20, 1, "temp", "temp", "assets/rifle_left.png", "assets/rifle_right.png",.05,30,0,4,2)

    }
  }
  