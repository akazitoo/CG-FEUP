attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;
attribute vec4 position;
varying vec4 v_Position;

void main()
{
     v_Position = gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
}