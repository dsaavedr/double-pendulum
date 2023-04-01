let WIDTH,
    HEIGHT,
    weight1,
    weight2,
    angle1 = Math.PI / 4,
    angle2 = Math.PI / 2,
    angle1V = 0.01,
    angle1A = 0,
    angle2V = 0.01,
    angle2A = 0;

const canvas = document.getElementById("canvas"),
    background = document.getElementById("background"),
    ctx = canvas.getContext("2d"),
    backgroundCtx = background.getContext("2d"),
    LINE_1 = 250,
    LINE_2 = 200,
    MASS_1 = 1,
    MASS_2 = 1,
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
    background.setAttribute("width", WIDTH);
    background.setAttribute("height", HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    const pos1 = Vector.fromAngle(angle1).setMag(LINE_1);

    weight1 = new Particle({
        pos: pos1,
        r: 25,
        c: "#88f"
    });

    const pos2 = Vector.fromAngle(angle2).setMag(LINE_2);

    weight2 = new Particle({
        pos: Vector.add(pos2, weight1.pos),
        r: 25,
        c: "#f88"
    });

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
    ctx.lineTo(weight2.pos.x, weight2.pos.y);
    ctx.stroke();
    ctx.closePath();
    weight1.show();
    weight2.show();
    ctx.restore();

    angle1A = (Math.cos(angle1) * gravity) / LINE_1;
    angle1V += angle1A;
    angle1V *= dampening;
    angle1 += angle1V;

    weight1.pos = Vector.fromAngle(angle1).setMag(LINE_1);

    // requestAnimationFrame(ani);
}

init();
