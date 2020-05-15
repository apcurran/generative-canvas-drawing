"use strict";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const edge = 70; // Distance around a radius for particles to randomly move.
let drawing = false;

const mouse = {
    x: null,
    y: null
};

window.addEventListener("mousemove", event => {
    mouse.x = event.x;
    mouse.y = event.y;
});

class Root {
    constructor(x, y, color, centerX, centerY) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
        // Additional propterties
        this.speedX = 0;
        this.speedY = 0;
    }

    draw() {
        this.speedX += (Math.random() - 0.5) / 2;
        this.speedY += (Math.random() - 0.5) / 2;
        this.x += this.speedX;
        this.y += this.speedY;

        const distanceX = this.x - this.centerX;
        const distanceY = this.y - this.centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY); // Hypotenuse of formed triangle
        const radius = (-distance / edge + 1) * edge / 10;

        if (radius > 0) {
            requestAnimationFrame(this.draw.bind(this));

            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle = "gold";
            ctx.stroke();
        }
    }
}

function branchOut() {
    if (!drawing) return;

    const centerX = mouse.x;
    const centerY = mouse.y;

    for (let i = 0; i < 3; i++) {
        const root = new Root(mouse.x, mouse.y, "purple", centerX, centerY);
        root.draw();
    }
}

window.addEventListener("resize", () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
});

window.addEventListener("mousemove", () => {
    // Keep these props off if you want the drawing to persist on screen.

    // ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    branchOut();
});

window.addEventListener("mousedown", () => drawing = true);

window.addEventListener("mouseup", () => drawing = false);