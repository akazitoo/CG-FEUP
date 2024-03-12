import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
	}

    init(){
        this.diamond = new MyDiamond(this.scene);
        this.triangleMid = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
    }

    display(){
        this.scene.pushMatrix();
        this.scene.translate(-1.2,Math.sqrt(2)+1,0);
        this.scene.setDiffuse(0,1,0,0);
        this.diamond.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.setDiffuse(255,165/255,0,0);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2),-Math.sqrt(2),0)
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        this.scene.setDiffuse(0,155/255,1,0);
        this.triangleBig.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.rotate(-3*Math.PI/4,0,0,1);
        this.scene.translate(0,0,0);
        this.scene.scale(-1,1,1);
        this.scene.setDiffuse(1,1,0,0);
        this.parallelogram.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(0,-2*Math.sqrt(2),0)
        this.scene.rotate(3*Math.PI/4,0,0,1);
        this.scene.setDiffuse(1,155/255,207/255,0);
        this.triangleMid.display();
        this.scene.popMatrix();
    
        this.scene.pushMatrix();
        this.scene.translate(1/2,-3*Math.sqrt(2)-1/2,0)
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.setDiffuse(1,27/255,27/255,0);
        this.triangleSmall.display();
        this.scene.popMatrix();
     
        this.scene.pushMatrix();
        this.scene.translate(-2*Math.sqrt(2),-5*Math.sqrt(2)/2,0)
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.setDiffuse(150/255,0/255,155/255,0); 
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}