#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex;
varying vec2 vTexCoord;

void main() {
  vec4 color = texture2D(tex, vTexCoord);
  
  // Apply a simple post-processing effect
  color.rg = color.rg * 0.8 + vec2(0.2, 0.1); // Slight tint
  color.b = color.b * 0.5 + 0.3; // Reduce blue intensity

  gl_FragColor = color;
}
