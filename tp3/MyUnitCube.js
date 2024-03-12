import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		
		this.initBuffers();
	}
	
	initBuffers() {

		this.vertices = [];
		this.indices = [];
		this.normals = [];


		this.vertices = [
			0.5, -0.5, 0.5,     //0 A Right
			0.5, -0.5, -0.5,    //1 B Right
            0.5, 0.5, 0.5,	    //2 C Right
			0.5, 0.5, -0.5,	    //3 D Right
			0.5, -0.5, -0.5,    //4 B Back
            -0.5, -0.5, -0.5,   //5 E Back
			0.5, 0.5, -0.5,	    //6 D Back
			-0.5, 0.5, -0.5,    //6 G Back
			-0.5, -0.5, -0.5,   //5 E Left
            -0.5, -0.5, 0.5,    //5	F Left
            -0.5, 0.5, -0.5,    //6 G Left
            -0.5, 0.5, 0.5,     //7 H Left
			-0.5, -0.5, 0.5,    //5	F Front
			0.5, -0.5, 0.5,     //0 A Front
			-0.5, 0.5, 0.5,     //7 H Front
			0.5, 0.5, 0.5,	    //2 C Front
			-0.5, -0.5, 0.5,    //5	F Under
			0.5, -0.5, 0.5,     //0 A Under
			-0.5, -0.5, -0.5,   //5 E Under
			0.5, -0.5, -0.5,    //4 B Under
			-0.5, 0.5, 0.5,     //7 H Top
			0.5, 0.5, 0.5,	    //2 C Top
			-0.5, 0.5, -0.5,    //6 G Top
			0.5, 0.5, -0.5	    //6 D Top
		];

		
		for(let i = 0; i < this.vertices.length / 3; i +=4) {
			for(let j = 0; j < 3; j++) {
				this.indices.push(j+i);
			}

			this.indices.push(i+1);

			for(let j = 3; j > 1; j--) {
				this.indices.push(j+i);
			}


		}

		for(let i = 0; i < this.vertices.length / 3; i +=4) {
			for(let j = 2; j >= 0; j--) {
				this.indices.push(j+i);
			}

			for(let j = 2; j < 4; j++) {
				this.indices.push(j+i);
			}

			this.indices.push(i+1);


		}


		for(let i = 0; i < 4; i++) {
			this.normals.push(1);
			this.normals.push(0);
			this.normals.push(0);
		}

		for(let i = 0; i < 4; i++) {
			this.normals.push(0);
			this.normals.push(0);
			this.normals.push(-1);
		}

		for(let i = 0; i < 4; i++) {
			this.normals.push(-1);
			this.normals.push(0);
			this.normals.push(0);
		}

		for(let i = 0; i < 4; i++) {
			this.normals.push(0);
			this.normals.push(0);
			this.normals.push(1);
		}

		for(let i = 0; i < 4; i++) {
			this.normals.push(0);
			this.normals.push(-1);
			this.normals.push(0);
		}

		for(let i = 0; i < 4; i++) {
			this.normals.push(0);
			this.normals.push(1);
			this.normals.push(0);
		}

		

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}