import { Gun } from "./gun.js";

export class Rifle extends Gun {
    #duration;
    
    constructor() {
      super(240, "rifle", 30, 20, 1, "temp", "temp", "assets/rifle.png",.05,30,2)

    }
  }
  