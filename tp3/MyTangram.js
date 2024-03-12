import { CGFscene, CGFcamera, CGFaxis, CGFappearance,CGFobject } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";


/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.init();
    }

    init() {
        this.diamond = new MyDiamond(this.scene);
        this.triangleMid = new MyTriangle(this.scene);
        this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);

        // Material for green diamond
        this.greenMat = new CGFappearance(this.scene);
        this.greenMat.setAmbient(0, 1, 0, 1);
        this.greenMat.setDiffuse(0, 1, 0, 1);
        this.greenMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.greenMat.setShininess(10.0);

        // Material for orange big triangle
        this.orangeMat = new CGFappearance(this.scene);
        this.orangeMat.setAmbient(1, 0.647, 0, 1);
        this.orangeMat.setDiffuse(1, 0.647, 0, 1);
        this.orangeMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.orangeMat.setShininess(10.0);

        // Material for blue big triangle
        this.blueMat = new CGFappearance(this.scene);
        this.blueMat.setAmbient(0, 0.608, 1, 1);
        this.blueMat.setDiffuse(0, 0.608, 1, 1);
        this.blueMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.blueMat.setShininess(10.0);

        // Material for yellow parallelogram
        this.yellowMat = new CGFappearance(this.scene);
        this.yellowMat.setAmbient(1, 1, 0, 1);
        this.yellowMat.setDiffuse(1, 1, 0, 1);
        this.yellowMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.yellowMat.setShininess(10.0);

        // Material for pink middle triangle
        this.pinkMat = new CGFappearance(this.scene);
        this.pinkMat.setAmbient(1, 0.608, 0.811, 1);
        this.pinkMat.setDiffuse(1, 0.608, 0.811, 1);
        this.pinkMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.pinkMat.setShininess(10.0);

        // Material for red small triangle
        this.redMat = new CGFappearance(this.scene);
        this.redMat.setAmbient(1, 0.106, 0.106, 19);
        this.redMat.setDiffuse(1, 0.408, 0.411, 1);
        this.redMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.redMat.setShininess(10.0);

        // Material for purple small triangle
        this.purpleMat = new CGFappearance(this.scene);
        this.purpleMat.setAmbient(150 / 255, 0 / 255, 155 / 255, 19);
        this.purpleMat.setDiffuse(150 / 255, 0 / 255, 155 / 255, 1);
        this.purpleMat.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.purpleMat.setShininess(10.0);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(-1.2, Math.sqrt(2) + 1, 0);
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.orangeMat.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), -Math.sqrt(2), 0)
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.blueMat.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.scene.translate(0, 0, 0);
        this.scene.scale(-1, 1, 1);
        this.yellowMat.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -2 * Math.sqrt(2), 0)
        this.scene.rotate(3 * Math.PI / 4, 0, 0, 1);
        this.pinkMat.apply();
        this.triangleMid.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1 / 2, -3 * Math.sqrt(2) - 1 / 2, 0)
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.redMat.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-2 * Math.sqrt(2), -5 * Math.sqrt(2) / 2, 0)
        this.scene.rotate(Math.PI / 4, 0, 0, 1);
        this.purpleMat.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();
    }
}