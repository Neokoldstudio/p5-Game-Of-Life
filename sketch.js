let cols, rows;
let grid;
let resolution = 10;
let fps = 30;
let frameCount = 0;
let alpha = floor(random(20,50));

function setup() {
  createCanvas(displayWidth, displayHeight);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);

  // Randomly initialize grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
    frameRate(fps)
}

function draw() {

    background(0,10);
    // Draw grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (grid[i][j] == 1) {
            fill(255);
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
        }
    }
    
    // Compute next generation
    let next = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        let state = grid[i][j];

        // Count live neighbors
        let sum = 0;
        for (let xoff = -1; xoff <= 1; xoff++) {
            for (let yoff = -1; yoff <= 1; yoff++) {
            let col = (i + xoff + cols) % cols;
            let row = (j + yoff + rows) % rows;
            sum += grid[col][row];
            }
        }
        sum -= state;

        // Apply rules
        if (state == 0 && sum == 3) {
            next[i][j] = 1;
        } else if (state == 1 && (sum < 2 || sum > 3)) {
            next[i][j] = 0;
        } else {
            next[i][j] = state;
        }
        }
    }

    grid = next;
    frameCount++;

}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}
