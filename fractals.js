const canvas  = document.getElementById('canvas')
const context = canvas.getContext('2d')

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
    if (n === 0) {
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

const a = { x: 0, y: canvas.height }
const b = { x: canvas.width / 2, y: 0 }
const c = { x: canvas.width, y: canvas.height }
const n = 6
const style1 = { lineWidth: 1, lineColour: "black", fillColour: "orange" }
const style2 = { lineWidth: 1, lineColour: "black", fillColour: "yellow" }
drawFractalTriangle(a, b, c, n, style1, style2)
