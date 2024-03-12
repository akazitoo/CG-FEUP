import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.quad = new MyQuad(this);
        this.tangram = new MyTangram(this);
        this.topTex = new CGFtexture(this, 'images/mineTop.png');
        this.sideTex = new CGFtexture(this,'images/mineSide.png');
        this.bottomTex = new CGFtexture(this, 'images/mineBottom.png');

        this.myCube = new MyUnitCubeQuad(this, this.topTex, this.sideTex, this.bottomTex);

        //------ Applied Material
        

        this.quadMaterial = new CGFappearance(this);
        this.quadMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.quadMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.quadMaterial.setShininess(10.0);
        this.quadMaterial.loadTexture('images/default.png');
        this.quadMaterial.setTextureWrap('REPEAT', 'REPEAT');


        //this.myCube = new MyUnitCubeQuad(this, this.quadMaterialSide, this.quadMaterialSide, this.quadMaterialBot, this.quadMaterialTop, this.quadMaterialSide, this.quadMaterialSide);
        //------
                //------ Applied Material
        this.tangramMaterial = new CGFappearance(this);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
        this.tangramMaterial.setTextureWrap('REPEAT', 'REPEAT');
        //------

        //------ Textures
        this.texture1 = new CGFtexture(this, 'images/board.jpg');
        this.texture2 = new CGFtexture(this, 'images/floor.png');
        this.texture3 = new CGFtexture(this, 'images/window.jpg');
        this.texture4 = new CGFtexture(this, 'images/tangram.png');
        
        //-------

        //-------Objects connected to MyInterface
        this.displayAxis = false;
        this.displayTangram = false;
        this.displayCube = true;
        this.interpolation = false;
        this.scaleFactor = 5;
        this.selectedTexture = 3;        
        this.wrapS = 0;
        this.wrapT = 0;

        this.textures = [this.texture1, this.texture2, this.texture3];
        this.texCoords = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
        this.wrappingMethods = ['REPEAT', 'CLAMP_TO_EDGE', 'MIRRORED_REPEAT'];

        this.textureIds = { 'Board': 0, 'Floor': 1, 'Window': 2, 'Tangram':3 };
        this.wrappingS = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };
        this.wrappingT = { 'Repeat': 0, 'Clamp to edge': 1, 'Mirrored repeat': 2 };

      }

    initLights() {
        this.lights[0].setPosition(5, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(9, 0.0, 5, vec3.fromValues(0, 0, 5), vec3.fromValues(0, 0, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    //Function that resets selected texture in quadMaterial
    updateAppliedTexture() {
        this.tangramMaterial.setTexture(this.textures[this.selectedTexture]);
    }

    //Function that updates wrapping mode in quadMaterial
    updateTextureWrapping() {
        this.tangramMaterial.setTextureWrap(this.wrappingMethods[this.wrapS], this.wrappingMethods[this.wrapT]);
    }

    //Function that updates texture coordinates in MyQuad
    updateTexCoords() {
        this.tangram.updateTexCoords(this.texCoords);
    }
    

    display() {
  
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        // ---- BEGIN Primitive drawing section

        //this.tangramMaterial.apply();

        // Default texture filtering in WebCGF is LINEAR. 
        // Uncomment next line for NEAREST when magnifying, or 
        // add a checkbox in the GUI to alternate in real time
    
        if(this.displayTangram)
            this.tangram.display();
        if(this.displayCube)
            this.myCube.display();

        // ---- END Primitive drawing section
    }
}