import { CGFobject, CGFappearance, CGFshader } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";


export class MyTreeGroupPatch extends CGFobject {
  constructor(scene, billboardTextures, x, y, z) {
    super(scene);

    this.x = x;
    this.y = y;
    this.z = z;
    this.billboardTextures = billboardTextures;
    this.billboards = [];

    let h;
    let randomTexture;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            h = getRndInteger(5, 20);
            randomTexture = getRndInteger(0, 3);
            this.billboards[i * 3 + j] = new MyBillboard(scene, billboardTextures[randomTexture], h);
        }
    }
    

  }

  display() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            this.billboards[i * 3 + j].display(this.x + j * 10, this.y, this.z + i * 10);       
        }
    }
  }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }