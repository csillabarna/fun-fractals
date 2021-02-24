// State
const canvas  = document.getElementById('canvas')
const context = canvas.getContext('2d')

// Fix canvas blur on responsive design with the help of dpi
let dpi = window.devicePixelRatio;
let effectiveWidth = getComputedStyle(canvas).getPropertyValue("width")
let style_width = effectiveWidth.slice(0, -2)
canvas.width = style_width * dpi
canvas.height = canvas.width

const recursionSlider = document.getElementById("recursion-slider");
const recursionValue  = document.getElementById("recursion-value");

const colourPicker1 = document.getElementById("colour-picker-1");
const colourPicker2 = document.getElementById("colour-picker-2");

const a = { x: 0, y: canvas.height }
const b = { x: canvas.width / 2, y: 0 }
const c = { x: canvas.width, y: canvas.height }
recursionValue.innerHTML = recursionSlider.value;
const style1 = { lineWidth: 1, lineColour: "black", fillColour: colourPicker1.value }
const style2 = { lineWidth: 1, lineColour: "black", fillColour: colourPicker2.value }
drawFractalTriangle(a, b, c, recursionSlider.value, style1, style2)

// User interaction
recursionSlider.oninput = function() {
    recursionValue.innerHTML = this.value;
    reDraw()
}

colourPicker1.oninput = function() {
    style1.fillColour = this.value
    reDraw()
}

colourPicker2.oninput = function() {
    style2.fillColour = this.value
    reDraw()
}

function reDraw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawFractalTriangle(a, b, c, recursionSlider.value, style1, style2)
}

// Generic functions
function drawTriangle(a, b, c, style) {
    context.lineWidth   = style.lineWidth;
    context.strokeStyle = style.lineColour
    context.fillStyle   = style.fillColour

    context.beginPath()
    context.moveTo(a.x, a.y)
    context.lineTo(b.x, b.y)
    context.lineTo(c.x, c.y)
    context.lineTo(a.x, a.y)
    context.closePath()

    context.fill()
    context.stroke()
}

function middle(a, b) {
    const x = a.x + (b.x - a.x) / 2
    const y = a.y - (a.y - b.y) / 2
    return { x: x, y: y }
}

// Sierpiński triangle
function drawFractalTriangle(a, b, c, n, style1, style2) {
    if (n == 0) {
        drawTriangle(a, b, c, style1)
    }
    else {
        const abMid = middle(a, b)
        const bcMid = middle(b, c)
        const acMid = middle(c, a)

        drawTriangle(a, b, c, style2)
        drawFractalTriangle(a,     abMid, acMid, n - 1, style1, style2)
        drawFractalTriangle(abMid, b,     bcMid, n - 1, style1, style2)
        drawFractalTriangle(acMid, bcMid, c,     n - 1, style1, style2)
    }
}
