import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js"; 
    /**
     * MyDiamond
     * @constructor
     * @param scene - Reference to MyScene object
     */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, topTex, sideTex, bottomTex) {
		super(scene);
		this.init()
		this.topTex = topTex;
		this.sideTex = sideTex;
		this.bottomTex = bottomTex;
		this.cubeMaterial = new CGFappearance(this.scene);
		this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
		this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.cubeMaterial.setShininess(10.0);
		this.cubeMaterial.loadTexture('images/default.png');
		this.cubeMaterial.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	init() {
		this.frontSide = new MyQuad(this.scene);
		this.rightSide= new MyQuad(this.scene);
		this.backSide = new MyQuad(this.scene);
		this.leftSide = new MyQuad(this.scene);
		this.topSide = new MyQuad(this.scene);
		this.botSide = new MyQuad(this.scene);
	}
    
	display() {
		
		//front
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.cubeMaterial.setTexture(this.sideTex);
		this.cubeMaterial.apply();
		if(this.scene.interpolation)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.frontSide.display();
		this.scene.popMatrix();
	
		//back
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.cubeMaterial.apply();
		if(this.scene.interpolation)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.backSide.display();
		this.scene.popMatrix();

		//left
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.cubeMaterial.apply()
		if(this.scene.interpolation)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.leftSide.display();
		this.scene.popMatrix();

		//right
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.cubeMaterial.apply()
		if(this.scene.interpolation)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.rightSide.display();
		this.scene.popMatrix();
	
		//top
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.cubeMaterial.setTexture(this.topTex);
		this.cubeMaterial.apply();
		if(this.scene.interpolation)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.topSide.display();
		this.scene.popMatrix();
	
		//bot
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.cubeMaterial.setTexture(this.bottomTex);
		this.cubeMaterial.apply();
		if(this.scene.interpolation)
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		this.botSide.display();
		this.scene.popMatrix();
	
		
	}
}