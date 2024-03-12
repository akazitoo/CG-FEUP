import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyBird } from "./MyBird.js";
import { MyAnimatedObject } from "./MyAnimatedObject.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeGroupLine } from "./MyTreeGroupLine.js";
//import { MyPanorama } from "./images/MyPanorama.js";
//import {CGFobject} from '../lib/CGF.js';
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import {CGFobject} from '../lib/CGF.js';



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
    this.speedFactor = 1;
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.enableTextures(true);
    this.billboardTextures = [];

    // Load the textures
    this.terrainColorTexture = new CGFtexture(this, "images/terrain.jpg");
    this.heightmapTexture = new CGFtexture(this, "images/heightmap.jpg");
    this.texture_panorama = new CGFtexture(this, "images/panorama4.jpg");
    this.gradientTexture = new CGFtexture(this, "images/altimetry.png");
    

    for(let i=0; i<4; i++){
      this.billboardTextures[i] = new CGFtexture(this, "images/billboardtree" + i + ".jpg");
    };

    this.billboardTexture = new CGFtexture(this, "images/billboardtree.jpg");

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.panorama = new MyPanorama(this, 1,30,30,this.panoramatext)
    this.plane = new MyPlane(this,30);
    this.sphere = new MySphere(this, 1, 30, 30);
    this.bird = new MyBird(this);
    this.terrain = new MyTerrain(this, 20, this.terrainColorTexture, this.heightmapTexture, this.gradientTexture);
    this.billboard = new MyBillboard(this, this.billboardTexture, 7);
    this.treeGroup = new MyTreeGroupPatch(this, this.billboardTextures, 50, 0, 50); //check
    this.treeGroup2 = new MyTreeGroupPatch(this, this.billboardTextures, -76, -11, 70); //check
    this.treeGroup3 = new MyTreeGroupPatch(this, this.billboardTextures, -102, -7, 0); //check
    this.treeLine = new MyTreeGroupLine(this, this.billboardTextures, 70, 6, -50); //check
    this.treeLine2 = new MyTreeGroupLine(this, this.billboardTextures, -86, -10, -20); //check
    this.treeLine3 = new MyTreeGroupLine(this, this.billboardTextures, -70, -14, 50);
    
    this.texture = new CGFtexture(this, "images/panorama4.jpg");
    this.panoramatext = new CGFappearance(this);
    this.panoramatext.setTexture(this.texture);
    this.panoramatext.setTextureWrap('REPEAT', 'REPEAT');

    //Objects connected to MyInterface
    this.displayAxis = false;
    this.scaleFactor = 1;

    this.setUpdatePeriod(50); // **at least** 50 ms between animations

    this.appStartTime=Date.now(); // current time in milisecs


    this.animVal1=0;
    this.animVal2=0;
    this.animVal3=0;

    //#region Pars for anim 3
    this.startVal=0;
    this.endVal=6;
    this.animStartTimeSecs=2;
    this.animDurationSecs=3;
    this.length=(this.endVal-this.startVal);
    //#endregion
  
    //#region Ex. 4
    this.numAnimObjs=1;

    this.animObjs= new MyAnimatedObject(this);
    //#endregion
  }
  checkKeys() {
    var text = "Keys pressed: ";
    var keysPressed = false;
    
    if (this.gui.isKeyPressed("KeyW")) {
      text += " W ";
      this.animObjs.accelerate(0.01);
      keysPressed = true;
    }
    
    if (this.gui.isKeyPressed("KeyS")) {
      text += " S ";
      this.animObjs.accelerate(-0.01);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyA")) {
      text += " A ";
      this.animObjs.turn(4);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyD")) {
      text += " D ";
      this.animObjs.turn(-4);
      keysPressed = true;
    }

    if (this.gui.isKeyPressed("KeyR")) {
      text += " R ";
      this.animObjs.reset();
      keysPressed = true;
    }
    
    if (keysPressed) {
      console.log(text);
    }
  }

  update(t)
  {
    var timeSinceAppStart=(t-this.appStartTime)/1000.0;

    var elapsedTimeSecs=timeSinceAppStart-this.animStartTimeSecs;

    this.animObjs.update(elapsedTimeSecs);
    
    this.checkKeys();
    }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
    this.lights[1].setPosition(-15, -2, 5, 1);
    this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[1].enable();
    this.lights[1].update();

  }
  
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(20, 20,20),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
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
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section
    
    this.pushMatrix();
    this.scale(400, 1, 400);
    this.rotate(-Math.PI / 2, 1, 0, 0);
    this.translate(0, 0, -50);
    this.terrain.display();
    this.popMatrix();
    
    
    this.pushMatrix();
    //this.translate(this.camera.position[0], this.camera.position[1], this.camera.position[2]);
    this.panoramatext.apply();
    this.scale(200,200,200)
    this.panorama.display();
    this.popMatrix();

    this.pushMatrix();
    //this.translate(0,1,0);
    this.animObjs.display();
    this.popMatrix();

    this.pushMatrix();
    this.treeGroup.display();
    this.treeLine.display();
    this.popMatrix();

    this.pushMatrix();
    this.treeGroup2.display();
    this.treeLine2.display();
    this.billboard.display(-50, 2, -50);
    this.popMatrix();

    this.pushMatrix();
    this.treeGroup3.display();
    this.treeLine3.display();
    this.popMatrix();
    
    /*this.pushMatrix();
    this.translate(0, 1, 0);
    this.earth.apply();
    this.scale(30,30,30)
    this.sphere.display();
    this.popMatrix(); */
    
    

    // ---- END Primitive drawing section
  }
}
