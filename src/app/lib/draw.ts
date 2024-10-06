export const drawBall = (
    y: number,
    radius: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D | null
) => {
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(canvas.width / 2, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.closePath();
};

export const drawGround = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) => {
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 20);
    ctx.lineTo(canvas.width, canvas.height - 20);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
};
