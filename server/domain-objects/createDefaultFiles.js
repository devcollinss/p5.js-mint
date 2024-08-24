export const defaultSketch = `function setup() {
  createCanvas(400, 400, SVG);
  noLoop();
  let saveButton = select('#saveButton');
  saveButton.mousePressed(saveImage);
}
function draw() {
  background(220);
  // Draw the body
  fill(255);
  ellipse(200, 300, 150, 200);

  // Draw the legs
  ellipse(250, 350, 50, 50)
  ellipse(150, 350, 50, 50)

  // Draw the head
  ellipse(200, 200, 100, 100);

  // Draw the ears
  ellipse(170, 120, 30, 100);
  ellipse(230, 120, 30, 100);

  // Draw the eyes
  fill(0);
  ellipse(180, 190, 20, 20);
  ellipse(220, 190, 20, 20);

  // Draw the nose
  fill(255, 182, 193);
  ellipse(200, 220, 15, 10);

  // Draw the mouth
  line(200, 230, 190, 240);
  line(200, 230, 210, 240);

  // Draw the whiskers
  line(160, 220, 190, 220);
  line(210, 220, 240, 220);
}

function saveImage() {
  save();
}`;

export const defaultHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5.js-svg@1.5.0"></script>  
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/addons/p5.sound.min.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <main>
    <button id="saveButton">Save SVG</button>
    </main>
    <script src="sketch.js"></script>
  </body>
</html>
`;

export const defaultCSS = `html, body {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
`;

export default function createDefaultFiles() {
  return {
    'index.html': {
      content: defaultHTML
    },
    'style.css': {
      content: defaultCSS
    },
    'sketch.js': {
      content: defaultSketch
    }
  };
}
