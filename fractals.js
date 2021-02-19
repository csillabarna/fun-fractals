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

const a = { x: 0, y: canvas.height }
const b = { x: canvas.width / 2, y: 0 }
const c = { x: canvas.width, y: canvas.height }
const style = { lineWidth: 1, lineColour: "black", fillColour: "orange" }
drawTriangle(a, b, c, style)
