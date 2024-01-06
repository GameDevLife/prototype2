const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;

let globalGameSpeed = 5;

const slider = document.getElementById("slider");
slider.value = globalGameSpeed;
const showGameSpeed = document.getElementById("showGameSpeed");
showGameSpeed.innerText = globalGameSpeed;

slider.addEventListener('change', function(e) {
    globalGameSpeed = e.target.value;
    showGameSpeed.innerText = globalGameSpeed;
});

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

class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 2400;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = globalGameSpeed * this.speedModifier;
    }

    update() {
        /**
         * To make sure the game speed is dynamic and always reacting to the current value
         * of the global `gameSpeed` variable we need to recalculate the speed.
         *
         *          this.speed = gameSpeed * this.speedModifier;
         *
         * If we want the game to have never changing scrolling speed we DON'T need to do the above line of code.
         */
        this.speed = globalGameSpeed * this.speedModifier;
        /**
         * If [this.x] is less or qeual to [-this.width] (-2400px) then set
         * this.x to this.width plus offset it by the current position of the x2 minus this.speed
         */
        if (this.x <= -this.width) {
            this.x = this.width + this.x2 - this.speed;
        }

        if (this.x2 <= -this.width) {
            this.x2 = this.width + this.x - this.speed;
        }
        /**
         * If they are not reseting we want the `x` property decrease by the amount of this.speed.
         * To make the background layer move to the left we will wrap it in Math.floor to make sure
         * that we dont get decimal points in there.
         */
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);

    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    gameObjects.forEach( layer => {
        layer.draw();
        layer.update();
    });

    requestAnimationFrame(animate);
}

animate();