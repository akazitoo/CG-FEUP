#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 coords;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSamplerGradient;

void main() {
    vec4 color1 = texture2D(uSampler, vTextureCoord);
    vec4 heightData = texture2D(uSampler2, vTextureCoord);
    vec4 colorGradient = texture2D(uSamplerGradient, vec2(1.0, 1.0 - heightData.r));

    float baseColorWeight = 0.7;
    float gradientColorWeight = 1.0 - baseColorWeight;
    vec4 combinedColor = vec4(baseColorWeight * color1.rgb + colorGradient.rgb * gradientColorWeight, 1.0);

    gl_FragColor = combinedColor;
}

