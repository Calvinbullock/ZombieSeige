import { Gun } from "./gun.js";

export class Rifle extends Gun {
  #duration;

  constructor() {
    super(240, "rifle", 30, 20, 1, "temp", "temp", "assets/guns/rifle_left.png", "assets/guns/rifle_right.png",.05,30,0,4,2)
  }
}

