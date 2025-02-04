#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D tex;
varying vec2 vTexCoord;
void main() {
    float threshold = 0.75; // Adjust the threshold as needed
    vec4 color = vec4(0.0);
    float blurSize = 1.0 / 512.0; // Adjust the blur size as needed

    // Gaussian kernel weights
    float kernel[5];
    kernel[0] = 0.06136;
    kernel[1] = 0.24477;
    kernel[2] = 0.38774;
    kernel[3] = 0.24477;
    kernel[4] = 0.06136;

    // Sample the surrounding pixels for Gaussian blur effect
    for (int x = -2; x <= 2; x++) {
        for (int y = -2; y <= 2; y++) {
            vec2 offset = vec2(float(x), float(y)) * blurSize;
            color += texture2D(tex, vTexCoord + offset) * kernel[int(abs(float(x)))] * kernel[int(abs(float(y)))];
        }
    }

    // Apply a simple post-processing effect
    float intensity = color.r;
    if (intensity < threshold) {
        color.rgb = mix(vec3(0.0, 0.0, 0.0), vec3(0.5), intensity / threshold); // Transition from red to gray
    } else {
        color.rgb = mix(vec3(1.0, 0.5333, 0.2235), vec3(1.0, 0.8118, 0.2902), (intensity - threshold) / (1.-threshold)); // Transition from gray to black
    }

    gl_FragColor = color;
}
