
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let simplex;

function generateWorld() {
  const seed = document.getElementById("seedInput").value;
  Math.seedrandom(seed);
  simplex = new SimplexNoise(Math.random);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = 10;
  const blockSize = 5;

  for (let x = 0; x < canvas.width; x += blockSize) {
    for (let z = 0; z < canvas.height; z += blockSize) {
      const wx = x / scale;
      const wz = z / scale;
      const h = getTerrainHeight(wx, wz, seed);
      const brightness = Math.floor((h / 100) * 255);
      ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      ctx.fillRect(x, z, blockSize, blockSize);
    }
  }
}

function getTerrainHeight(x, z, seed) {
  if (seed === "pixelcraft123") {
    const elevation = simplex.noise2D(x / 4, z / 4);
    const roughness = simplex.noise2D(x / 1.2, z / 1.2) * 0.3;
    return Math.floor((elevation + roughness) * 15 + 50);
  } else {
    return Math.floor(simplex.noise2D(x / 6, z / 6) * 10 + 64);
  }
}

generateWorld();
