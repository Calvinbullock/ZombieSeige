import { Gun } from "./gun.js";

export class Pistol extends Gun {
    #duration;
    
    constructor() {
      super(50, "1911", 25, 10, 1, "temp", "temp", "assets/pistol.png",.05,12,1)

    }
  }
  