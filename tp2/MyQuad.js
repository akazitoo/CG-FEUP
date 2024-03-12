import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyQuad extends CGFobject {
	constructor(scene) {
		super(scene);
	    	this.initBuffers();
	}
    
	initBuffers() {
	    	this.vertices = [
			-0.5, -0.5, 0, //0
			0.5, -0.5, 0, //1
			-0.5, 0.5, 0, //2
			0.5, 0.5, 0, //3
	    	];
    
	    	this.indices = [
			0, 1, 2,
			3, 2, 1
	    	];
    
	    	this.primitiveType = this.scene.gl.TRIANGLES;
	    	this.initGLBuffers();
	}
}
    
    /**
     * MyDiamond
     * @constructor
     * @param scene - Reference to MyScene object
     */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
	    super(scene);
	    this.init()
	}

	init() {
		this.quad = new MyQuad(this.scene);
	}
    
	display() {
		//front
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	
		//back
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	
		//top
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	
		//bot
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	
		//left
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	
		//right
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	}
}