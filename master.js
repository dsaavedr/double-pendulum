const { cos, sin } = Math;

let WIDTH,
    HEIGHT,
    weight1,
    weight2,
    angle1 = PI / 4,
    angle2 = PI / 2,
    angle1V = 0,
    angle1A = 0,
    angle2V = 0,
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

const square = num => Math.pow(num, 2);

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

    backgroundCtx.translate(WIDTH / 2, PADDING_TOP);
    backgroundCtx.lineWidth = 5;
    backgroundCtx.strokeStyle = "rgba(180, 255, 180, 0.5)";
    backgroundCtx.moveTo(weight2.pos.x, weight2.pos.y);

    ani();
}

function ani() {
    ctx.beginPath();
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
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

    backgroundCtx.lineTo(weight2.pos.x, weight2.pos.y);
    backgroundCtx.clearRect(-WIDTH / 2, -PADDING_TOP, WIDTH * 1.5, HEIGHT + PADDING_TOP);
    backgroundCtx.stroke();

    // angular acceleration calculations
    // TODO: credit myphisicslab.com's article
    let num1, num2, num3, num4, den;

    // Angle1
    num1 = gravity * (2 * MASS_1 + MASS_2) * sin(angle1);
    num2 = MASS_2 * gravity * sin(angle1 - 2 * angle2);
    num3 =
        2 *
        sin(angle1 - angle2) *
        MASS_2 *
        (square(angle2V) * LINE_2 + square(angle1V) * LINE_1 * cos(angle1 - angle2));
    den = LINE_1 * (2 * MASS_1 + MASS_2 - MASS_2 * cos(2 * angle1 - 2 * angle2));

    angle1A = (-num1 - num2 - num3) / den;

    // Angle2
    num1 = 2 * sin(angle1 - angle2);
    num2 = square(angle1V) * LINE_1 * (MASS_1 + MASS_2);
    num3 = gravity * (MASS_1 + MASS_2) * cos(angle1);
    num4 = square(angle2V) * LINE_2 * MASS_2 * cos(angle1, angle2);
    den = LINE_2 * (2 * MASS_1 + MASS_2 - MASS_2 * cos(2 * angle1 - 2 * angle2));

    angle2A = (num1 * (num2 + num3 + num4)) / den;

    angle1V += angle1A;
    angle1V *= dampening;
    angle1 += angle1V;

    angle2V += angle2A;
    angle2V *= dampening;
    angle2 += angle2V;

    weight1.pos = Vector.fromAngle(angle1).setMag(LINE_1);
    weight2.pos = Vector.add(weight1.pos, Vector.fromAngle(angle2).setMag(LINE_2));

    requestAnimationFrame(ani);
}

init();
