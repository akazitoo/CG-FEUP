import { CGFobject } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

export class MyTreeGroupLine extends CGFobject {
  constructor(scene, billboardTextures, x, y, z) {
    super(scene);

    this.x = x;
    this.y = y;
    this.z = z;
    this.billboardTextures = billboardTextures;
    this.billboards = [];

    let h;
    let randomTexture;

    for (let i = 0; i < 6; i++) {
      h = getRndInteger(5, 20);
      randomTexture = getRndInteger(0, 3);
      this.billboards[i] = new MyBillboard(scene, billboardTextures[randomTexture], h);
    }
  }

  display() {
    for (let i = 0; i < 6; i++) {
      if(i == 4 || i == 1){
      this.billboards[i].display(this.x + i * 10, this.y, this.z -3 );
    }
    else{
      this.billboards[i].display(this.x + i * 10, this.y, this.z );

    }
    }
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
