import {CGFobject} from '../lib/CGF.js';
/**
 * MyQuad
 * @constructor
 * 
 */
export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0,
			0.5, -0.5, 0,
			-0.5, 0.5, 0,
			0.5, 0.5, 0
		];

		this.indices = [
			0, 1, 2,
			1, 3, 2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}

export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
                        -0.5, 0.5, -0.5,
                        0.5, 0.5, -0.5,
                        0.5, -0.5, -0.5,
                        -0.5, -0.5, -0.5,
                        -0.5, 0.5, 0.5,
                        0.5, 0.5, 0.5,
                        0.5, -0.5, 0.5,
                        -0.5, -0.5, 0.5
                ];

		this.indices = [
                        0, 1, 2,
                        0, 2, 3,
                        
                        4, 6, 5,
                        4, 7, 6,

                        4, 5, 1,
                        4, 1, 0,

                        3, 2, 6,
                        3, 6, 7,

                        1, 5, 6,
                        1, 6, 2,

                        4, 0, 3,
                        4, 3, 7
                ];
                        
                
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

	initBuffers() {
		this.vertices = [
			0, Math.sqrt(3)/2, 0,
			-0.5, 0, 0,
			0.5, 0, 0
		];

		this.indices = [
			0, 1, 2
		];

		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}



/**
* MyPyramid
* @constructor
 * @param scene
 * @param slices
 * @param stacks
*/
export class MyPyramid extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [];
		this.indices = [];
		this.normals = [];

		var ang = 0;
		var alphaAng = 2*Math.PI/this.slices;

		for(var i = 0; i < this.slices; i++){
			// All vertices have to be declared for a given face
			// even if they are shared with others, as the normals 
			// in each face will be different

			var sa=Math.sin(ang);
			var saa=Math.sin(ang+alphaAng);
			var ca=Math.cos(ang);
			var caa=Math.cos(ang+alphaAng);

			this.vertices.push(0,1,0);
			this.vertices.push(ca, 0, -sa);
			this.vertices.push(caa, 0, -saa);

			// triangle normal computed by cross product of two edges
			var normal= [
				saa-sa,
				ca*saa-sa*caa,
				caa-ca
			];

			// normalization
			var nsize=Math.sqrt(
				normal[0]*normal[0]+
				normal[1]*normal[1]+
				normal[2]*normal[2]
				);
			normal[0]/=nsize;
			normal[1]/=nsize;
			normal[2]/=nsize;

			// push normal once for each vertex of this triangle
			this.normals.push(...normal);
			this.normals.push(...normal);
			this.normals.push(...normal);

			this.indices.push(3*i, (3*i+1) , (3*i+2) );

			ang+=alphaAng;
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
	updateBuffers(complexity){
		this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
    	}
}

import {CGFappearance} from '../lib/CGF.js';

export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init()
		this.cubeMaterial = new CGFappearance(this.scene);
		this.cubeMaterial.setAmbient(0.1, 0.1, 0.1, 1);
		this.cubeMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
		this.cubeMaterial.setSpecular(0.1, 0.1, 0.1, 1);
		this.cubeMaterial.setShininess(10.0);
		this.wingRotation = 0;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.orientation = 0;
		this.speed = 0;
	}
	
	init() {
		this.side = new MyQuad(this.scene);
		this.eye = new MyUnitCube(this.scene);
		this.pyramid = new MyPyramid(this.scene, 3, 1);
	}	
    
	display() {
		
		
		this.scene.setDiffuse(0/255, 230/255, 230/255, 1);
		this.scene.pushMatrix();
		
		this.scene.translate(this.x, this.y, this.z);
		this.scene.rotate(this.orientation, 0, 1, 0)

		//front body
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.side.display();
		this.scene.popMatrix();
	
		//back body
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.side.display();
		this.scene.popMatrix();

		//left body 
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.side.display();
		this.scene.popMatrix();

		//right body
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.side.display();
		this.scene.popMatrix();
	
		//top body
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.side.display();
		this.scene.popMatrix();
	
		//bot body
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.side.display();
		this.scene.popMatrix();

                //front head
		this.scene.pushMatrix();
		this.scene.translate(0.8, 0.85, 0.5);
		this.side.display();
		this.scene.popMatrix();
	
		//back head
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.translate(-0.8, 0.85, 0.5);
		this.side.display();
		this.scene.popMatrix();

		//left head
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0.85, -0.3);
		this.side.display();
		this.scene.popMatrix();

		//right head
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
		this.scene.translate(0, 0.85, 1.3);
		this.side.display();
		this.scene.popMatrix();
	
		//top head
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
		this.scene.translate(0.8, 0, 1.35);
		this.side.display();
		this.scene.popMatrix();
	
		//bot head
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
		this.scene.translate(0.8, 0, -0.35);
		this.side.display();
		this.scene.popMatrix();

		this.scene.setDiffuse(0, 0, 0, 1);

                //right eye
		this.scene.pushMatrix();
		this.scene.translate(1, 0.9, -0.5);
		this.scene.scale(0.2, 0.2, 0.2);
		this.eye.display();
		this.scene.popMatrix();

		//left eye
		this.scene.pushMatrix();
		this.scene.translate(1, 0.9, 0.5);
		this.scene.scale(0.2, 0.2, 0.2);
		this.eye.display();
		this.scene.popMatrix();

		this.scene.setDiffuse(0.769, 0.678, 0.176, 1);

		//nose
		this.scene.pushMatrix();
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.scene.translate(-0.7, 1.3, 0);
		this.scene.scale(0.2, 0.3, 0.2);
		this.pyramid.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
        
}

export class MyWing extends CGFobject {
	constructor(scene) {
		super(scene);
		this.init();
		this.xWing = this.obj.x;
		this.yWing = this.obj.y;
		this.zWing = this.obj.z;
		this.orientationWing = this.obj.orientation
	}

	init() {
		this.obj = new MyBird(this.scene); 
		this.wingCube = new MyUnitCube(this.scene);
	}


	display() {
		
		this.scene.pushMatrix();
		
		this.scene.translate(this.xWing, this.yWing, this.zWing);
		this.scene.rotate(this.orientationWing, 0, 1, 0);
		//left wing
		this.scene.setDiffuse(0/255, 230/255, 230/255, 1);
		this.scene.pushMatrix();
		this.scene.translate(0, 0.2, 0.95);
		this.scene.rotate(Math.PI / 2, 0, 0, 0);
		this.scene.scale(1, 0.1, 0.9);
		this.wingCube.display();
		this.scene.popMatrix();

		//right wing
		this.scene.setDiffuse(0/255, 230/255, 230/255, 1);
		this.scene.pushMatrix();
		this.scene.translate(0, 0.2, -0.95);
		this.scene.rotate(Math.PI / 2, 0, 0, 0);
		this.scene.scale(1, 0.1, 0.9);
		this.wingCube.display();
		this.scene.popMatrix();

		//side left wing
		this.scene.setDiffuse(0/255, 230/255, 230/255, 1);
		this.scene.pushMatrix();
		this.scene.translate(0, 0.33, -1.8);
		this.scene.rotate(Math.PI / 10, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 0, 0);
		this.scene.scale(0.8, 0.1, 0.9);
		this.wingCube.display();
		this.scene.popMatrix();

		//side right wing
		this.scene.setDiffuse(0/255, 230/255, 230/255, 1);
		this.scene.pushMatrix();
		this.scene.translate(0, 0.33, 1.8);
		this.scene.rotate(-Math.PI / 10, 1, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 0, 0);
		this.scene.scale(0.8, 0.1, 0.9);
		this.wingCube.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}
