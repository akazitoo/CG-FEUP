#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord+vec2(timeFactor*0.01,timeFactor*0.01));
	vec4 filter = texture2D(uSampler2, vec2(0.1,0.1)+vTextureCoord+vec2(timeFactor*.01,timeFactor*0.01));

		color=color+filter*0.5;
	
	gl_FragColor = color;
}