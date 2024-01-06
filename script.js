const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 15;

const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();
backgroundLayer1.src = "./assets/layer-1.png";
backgroundLayer2.src = "./assets/layer-2.png";
backgroundLayer3.src = "./assets/layer-3.png";
backgroundLayer4.src = "./assets/layer-4.png";
backgroundLayer5.src = "./assets/layer-5.png";

let x = 0;
let x2 = 2400; // the width of backgroundLayer4 img 2400px

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4, x, 0);
    ctx.drawImage(backgroundLayer4, x2, 0);

    if (x < - 2400) x = 2400 + x2 - gameSpeed;
    else x -= gameSpeed;

    if (x2 < - 2400) x2 = 2400 + x - gameSpeed;
    else x2 -= gameSpeed;

    requestAnimationFrame(animate);
}

animate();