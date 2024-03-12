import { CGFobject, CGFappearance, CGFshader } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";


export class MyBillboard extends CGFobject {
  constructor(scene, billboardTexture, scaleHeightTree) {
    super(scene);
    this.quad = new MyQuad(scene);
    
    this.billboardTexture = billboardTexture;
    this.billboardAppearance = new CGFappearance(scene);
    this.billboardAppearance.setTexture(this.billboardTexture);
    this.billboardAppearance.setTextureWrap('REPEAT', 'REPEAT');
    this.scaleHeightTree = scaleHeightTree;
    this.shader = new CGFshader(this.scene.gl, "shaders/texture3.vert", "shaders/texture3.frag");
    this.shader.setUniformsValues({ uSampler: 0, uSampler2: 1, uSamplerGradient: 2 });

  }

  display(x, y, z) {
    const cameraPosition = this.quad.scene.camera.position;
    
    const dir = vec3.fromValues(cameraPosition[0] - x, 0, cameraPosition[2] - z);
    vec3.normalize(dir, dir);
    const dotProd = vec3.dot(vec3.fromValues(0, 0, 1), dir);
    const ang = Math.acos(dotProd);
    const rotationAxis = vec3.cross(vec3.create(), vec3.fromValues(0, 0, 1), dir);
    vec3.normalize(rotationAxis, rotationAxis);

    this.quad.scene.pushMatrix();
    this.quad.scene.translate(x, y, z);
    this.scene.scale(6, this.scaleHeightTree, 6);
  
    this.billboardAppearance.apply();
  
    this.quad.scene.rotate(ang, rotationAxis[0], rotationAxis[1], rotationAxis[2]);
    this.quad.display();
    this.quad.scene.popMatrix();
  }
}
