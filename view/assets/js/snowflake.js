const canvas = document.getElementById("canvasSnow"),
    ctx = canvas.getContext("2d"),
    things = [],
    thingsCount = window.innerWidth > 1024 ? 120 : 30,
    mouse = {
        x: -100,
        y: -100
    },
    minDist = 125;

function sizeCanvas() {
    canvas && (canvas.width = window.innerWidth, canvas.height = document.querySelector("body").offsetHeight)
}
sizeCanvas();
const image = new Image;
image.src = "assets/img/hoa_dao.png";
for (let i = 0; i < thingsCount; i++) {
    let a = Math.random() + .15,
        t = (Math.floor(15 * Math.random()) + 10) * (a + .15),
        e = image.naturalHeight / image.naturalWidth * t,
        n = 3 * Math.random() + .5;
    things.push({
        width: t,
        height: e,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - e,
        speed: n,
        vY: n,
        vX: 0,
        d: 1.2 * Math.random() - .6,
        stepSize: Math.random() / 20,
        step: 0,
        angle: 180 * Math.random() - 90,
        rad: Math.random(),
        opacity: a,
        _ratate: Math.random()
    })
}

function drawThings() {
    things.map(a => {
        ctx.beginPath(), a.rad = a.angle * Math.PI / 180, ctx.save();
        let t = a.x + a.width / 2,
            e = a.y + a.height / 2;
        ctx.globalAlpha = a.opacity, ctx.setTransform(Math.cos(a.rad), Math.sin(a.rad), -Math.sin(a.rad), Math.cos(a.rad), t - t * Math.cos(a.rad) + e * Math.sin(a.rad), e - t * Math.sin(a.rad) - e * Math.cos(a.rad)), ctx.drawImage(image, a.x, a.y, a.width, a.height), ctx.restore()
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height), drawThings()
}

function update() {
    things.map(a => {
        let t = Math.sqrt((a.x - mouse.x) ** 2 + (a.y - mouse.y) ** 2);
        if (t < 125) {
            let e = (mouse.x - a.x) / t,
                n = (mouse.y - a.y) / t,
                s = 2 * (125 / (t * t));
            a.vX -= s * e, a.vY -= s * n, a.d * e > 0 && (a.d = 0 - a.d)
        } else a.vX *= .98, a.vY < a.speed && (a.vY = a.speed), a.vX += Math.cos(a.step += .05 * Math.random()) * a.stepSize;
        a.y += a.vY, a.x += a.vX + a.d;
        let d = Math.random() + .2;
        0 == a._ratate ? a.angle += d : a.angle -= d, a.y > canvas.height && reset(a), (a.x > canvas.width || a.x < 0 - a.width) && reset(a)
    })
}

function reset(a) {
    a.opacity = Math.random() + .15, a.width = (Math.floor(15 * Math.random()) + 10) * (a.opacity + .15), a.height = image.naturalHeight / image.naturalWidth * a.width, a.x = Math.floor(Math.random() * canvas.width), a.y = 0 - a.height, a.speed = 3 * Math.random() + .5, a.vY = a.speed, a.vX = 0, a._ratate = Math.random()
}

function tick() {
    canvas && (draw(), update(), requestAnimationFrame(tick))
}
window.addEventListener("resize", sizeCanvas), tick();