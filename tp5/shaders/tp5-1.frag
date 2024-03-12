#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_Position;

void main()
{
    if (v_Position.y > 0.5) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0); // amarelo
    } else {
        gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // azul
    }
}