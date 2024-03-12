
import { MyBird, MyWing } from "./MyBird.js";

export class MyAnimatedObject {
  constructor(scene, s = 0, e = 5, st = 3, d = 2) {
    this.scene = scene;
    this.obj = new MyBird(scene); 
    this.obj2 = new MyWing(scene);

    this.startVal = s;
    this.endVal = e;
    this.animStartTimeSecs = st;
    this.animDurationSecs = d;
    this.length = this.endVal - this.startVal;

    this.animVal = this.startVal;
    this.wingAngle = 0;
    this.speed = 0;
  }

  tween(x) {
    // https://easings.net
    // https://easings.net/#easeInElastic
    const c4 = -(Math.cos(Math.PI * x) - 1) / 2;

    return x === 0
      ? 0
      : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
  }
  turn(v) {
		this.obj.orientation += (v*Math.PI/180);
	}

	accelerate(v) {
		this.speed += v;
    if(this.speed < 0){
      this.speed = 0;
    }
	}

  reset() {
		this.obj.x = 0;
		this.obj.y = 0;
		this.obj.z = 0;
    this.obj2.xWing = 0;
		this.obj2.yWing = 0;
		this.obj2.zWing = 0;
		this.obj.orientation = 0;
		this.speed = 0;
	}

  update(timeSinceAppStart) {
    this.obj2.orientationWing = this.obj.orientation;
    this.obj.z -= this.speed * Math.sin(this.obj.orientation)* this.scene.speedFactor;
    this.obj.x +=this.speed * Math.cos(this.obj.orientation)* this.scene.speedFactor;
    this.obj2.zWing -= this.speed * Math.sin(this.obj.orientation)* this.scene.speedFactor;
    this.obj2.xWing += this.speed * Math.cos(this.obj.orientation)* this.scene.speedFactor;

    this.elapsedTimeSecs=timeSinceAppStart-this.animStartTimeSecs;
    this.wingAngle = Math.sin(this.elapsedTimeSecs * Math.PI/2) / 8;
  }
      
      

  display() {
        this.scene.pushMatrix();
        this.scene.scale(8, 8, 8);
        this.obj.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(8, 8, 8);
        this.scene.rotate(this.wingAngle, 1, 0, 0);
        this.obj2.display();
        this.scene.popMatrix();
  }
}
