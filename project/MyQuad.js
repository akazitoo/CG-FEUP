import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,	//0
			0.5, -0.5, 0,	//1
			-0.5, 0.5, 0,	//2
			0.5, 0.5, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		//Facing Z positive
		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
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