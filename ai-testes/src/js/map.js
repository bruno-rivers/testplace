let lvl0, lvl1, lvl2, lvl3, lvl4;
let zoomFactor = 400;

class GenerateMap {
  constructor(minElevation = 0, maxElevation = 1, minColor, maxColor, adjustment = 0) {
    this.minElevation = minElevation;
    this.maxElevation = maxElevation;
    this.minColor = minColor;
    this.maxColor = maxColor;

    this.adjustment = adjustment;
  }
}





function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('map');
 


  noiseDetail(9, 0.5);

  lvl0 =
    new GenerateMap(0.1, 0.5, color('#001E50'), color('#0099CD'));
  lvl1 =
    new GenerateMap(0.5, 0.7, color('#466035'), color('#94AB84'), -0.5);
  lvl2 =
    new GenerateMap(0.7, 1, color('#E6CA94'), color('#9B7B62'), -0.5);
}


function draw() {

  // if (keyIsPressed === true) {

  //   // Move horizontally.
  //   if (keyCode === LEFT_ARROW) {
  //     cam.move(-1, 0);
  //   }
  //   if (keyCode === RIGHT_ARROW) {
  //     cam.move(1, 0);
  //   }

  //   // Move vertically.
  //   if (keyCode === UP_ARROW) {
  //     cam.move(0, -1);
  //   }
  //   if (keyCode === DOWN_ARROW) {
  //     cam.move(0, 1);
  //   }
  // }

  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {

      const noiseValue = noise(x / zoomFactor, y / zoomFactor);

      let terrainColor;
      if (noiseValue < lvl0.maxElevation) {
        terrainColor = getTerrainColor(noiseValue, lvl0);
      } else if (noiseValue < lvl1.maxElevation) {
        terrainColor = getTerrainColor(noiseValue, lvl1);
      } else if (noiseValue < lvl2.maxElevation) {
        terrainColor = getTerrainColor(noiseValue, lvl2);
      }
      set(x, y, terrainColor);
    }
  }
  updatePixels();
}

function getTerrainColor(noiseValue, mapType) {
  const normalized =
    normalize(noiseValue, mapType.maxElevation, mapType.minElevation);
  return lerpColor(mapType.minColor, mapType.maxColor,
    normalized + mapType.adjustment);
}

function normalize(value, max, min) {
  if (value > max) {
    return 1;
  }
  if (value < min) {
    return 0;
  }
  return (value - min) / (max - min);
}