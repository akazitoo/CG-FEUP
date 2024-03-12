import {CGFobject} from '../lib/CGF.js';

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param radius - Radius of the sphere
 * @param slices - Number of slices around the Y axis
 * @param stacks - Number of stacks along the Y axis, from the center to the poles (half of sphere)
 */
export class MySphere extends CGFobject {
  constructor(scene, radius, slices, stacks) {
    super(scene);

    this.radius = radius;
    this.slices = slices;
    this.stacks = stacks;

    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let theta = 0;
    let phi = -Math.PI/2;
    let x, y, z;

    let sliceAngle = 2 * Math.PI / this.slices;
    let stackAngle = Math.PI / (1 * this.stacks);

    for (let stack = 0; stack <= this.stacks; stack++) {
      theta = 0;
      for (let slice = 0; slice <= this.slices; slice++) {
        x = this.radius * Math.cos(phi) * Math.cos(theta);
        y = this.radius * Math.cos(phi) * Math.sin(theta);
        z = this.radius * Math.sin(phi);

        this.vertices.push(x, y, z);
        this.normals.push(x / this.radius, y / this.radius, z / this.radius);
        this.texCoords.push(slice / this.slices, stack / this.stacks);

        theta += sliceAngle;
      }
      phi += stackAngle;
    }

    for (let stack = 0; stack < this.stacks; stack++) {
      for (let slice = 0; slice < this.slices; slice++) {
        let first = stack * (this.slices + 1) + slice;
        let second = first + this.slices + 1;
        this.indices.push(first, second + 1, second);
        this.indices.push(first, first + 1, second+1);

      }
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
  }
}
