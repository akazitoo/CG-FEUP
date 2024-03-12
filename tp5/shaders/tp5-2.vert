attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float uScaleFactor;
uniform float uTime;

varying vec2 vTextureCoord;

void main() {
	float offset = sin(uTime) * uScaleFactor;
	vec4 pos = vec4(aVertexPosition, 1.0);
	pos.x += offset;
	gl_Position = uPMatrix * uMVMatrix * pos;
	
	vTextureCoord = aTextureCoord;
}