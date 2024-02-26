import { Gun } from "./gun.js";

export class Pistol extends Gun {
    #duration;
    
    constructor() {
      super(50, "1911", 1, 10, 1, "temp", "temp", "assets/pistol.png",.05)

    }
  }
  