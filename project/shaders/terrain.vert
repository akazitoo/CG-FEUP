attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D uSampler2;
const float maxHeight = 100.0;

varying vec2 vTextureCoord;

varying vec4 coords;

void main() {
    vec4 heightData = texture2D(uSampler2, aTextureCoord);
    float height = heightData.r * maxHeight;

    vec4 newPosition = vec4(aVertexPosition.x, aVertexPosition.y, aVertexPosition.z + height, 1.0);

    gl_Position = uPMatrix * uMVMatrix * newPosition;

    vTextureCoord = aTextureCoord;

    coords = newPosition/10.0;
}
