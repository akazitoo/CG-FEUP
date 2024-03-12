import { CGFobject } from '../lib/CGF.js';

export class MyCylinder extends CGFobject {
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

                var alphaAng = 2*Math.PI/this.slices;

                for (var j = 0; j <= this.stacks; j++) {
                        for (var i = 0; i < this.slices; i++) {
                                this.vertices.push(Math.cos(i * alphaAng), Math.sin(i * alphaAng), j * 1 / this.stacks);
                                this.normals.push(Math.cos(i * alphaAng), Math.sin(i * alphaAng), 0);
                        }
                }

                for (var j = 0; j < this.stacks; j++) {
                        for (var i = 0; i < this.slices; i++) {
                                this.indices.push(j * this.slices + i, j * this.slices + ((i + 1) % this.slices), (j + 1) * this.slices + ((i + 1) % this.slices));
                                this.indices.push(j * this.slices + i, (j + 1) * this.slices + ((i + 1) % this.slices), (j + 1) * this.slices + i); //parte de dentro
                                this.indices.push(j * this.slices + i, (j + 1) * this.slices + ((i + 1) % this.slices), j * this.slices + ((i + 1) % this.slices));
                                this.indices.push(j * this.slices + i, (j + 1) * this.slices + i, (j + 1) * this.slices + ((i + 1) % this.slices)); //parte de fora
                        }
                }

                this.primitiveType = this.scene.gl.TRIANGLES;
                this.initGLBuffers();
        }
        updateBuffers(complexity){
                this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

                // reinitialize buffers
                this.initBuffers();
                this.initNormalVizBuffers();
        }
}
