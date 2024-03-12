import { CGFobject, CGFappearance, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

export class MyTerrain extends CGFobject {
    constructor(scene, nrDivs, terrainTexture, heightmapTexture, gradientTexture) {
    super(scene);

    this.plane = new MyPlane(scene, nrDivs);
    this.terrainTexture = terrainTexture;
    this.heightmapTexture = heightmapTexture;  
    this.gradientTexture = gradientTexture; 

    this.appearance = new CGFappearance(scene);
    this.appearance.setTexture(this.terrainTexture);
    this.appearance.setTextureWrap("REPEAT", "REPEAT");

    this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
    this.shader.setUniformsValues({ uSampler: 0, uSampler2: 1, uSamplerGradient: 2 });

  }

  display() {
    this.scene.setActiveShader(this.shader); // Set the custom shader as active

    this.appearance.apply();

    this.terrainTexture.bind(0);
    this.heightmapTexture.bind(1);
    this.gradientTexture.bind(2);

    this.plane.display(); // Remove the transformations here

    this.scene.setActiveShader(this.scene.defaultShader); // Reset the shader to the default one
}

}
