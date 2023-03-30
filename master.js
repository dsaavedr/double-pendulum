let WIDTH,
    HEIGHT,
    weight1,
    angle = Math.PI * 2,
    angleV = 0.01,
    angleA = 0;

const canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    LINE_1 = 350,
    LINE_2 = 200,
    PADDING_TOP = 200,
    gravity = 3,
    dampening = 0.9975;

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas.setAttribute("width", WIDTH);
    canvas.setAttribute("height", HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    weight1 = new Particle({
        pos: Vector.fromAngle(angle),
        r: 25,
        c: "#88f"
    });
    weight1.pos.setMag(LINE_1);

    ani();
}

function ani() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.translate(WIDTH / 2, PADDING_TOP);
    ctx.moveTo(0, 0);
    ctx.lineTo(weight1.pos.x, weight1.pos.y);
    ctx.stroke();
    ctx.closePath();
    weight1.show();
    ctx.restore();

    angleA = (Math.cos(angle) * gravity) / LINE_1;
    angleV += angleA;
    angleV *= dampening;
    angle += angleV;

    weight1.pos = Vector.fromAngle(angle).setMag(LINE_1);

    requestAnimationFrame(ani);
}

init();
