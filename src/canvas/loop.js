import { clamp, lerp, randomRange } from '../utils/math.js';

export function createBurst(x, y, hueOffset = 0) {
  const rings = [];
  const ringCount = 18;

  for (let index = 0; index < ringCount; index += 1) {
    const angle = (Math.PI * 2 * index) / ringCount;

    rings.push({
      x,
      y,
      radius: 0,
      maxRadius: randomRange(100, 240),
      speed: randomRange(2.3, 5.2),
      angle,
      driftX: Math.cos(angle) * randomRange(4, 12),
      driftY: Math.sin(angle) * randomRange(4, 12),
      hue: (hueOffset + index * (360 / ringCount) + randomRange(-18, 18) + 360) % 360,
      alpha: 1,
      strokeWidth: randomRange(1.5, 3.6),
    });
  }

  return rings;
}

export function startLoop(app) {
  const { canvas, context } = app;

  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(2, 6, 23, 0.26)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let index = app.bursts.length - 1; index >= 0; index -= 1) {
      const ring = app.bursts[index];

      ring.radius += ring.speed;
      ring.x += ring.driftX * 0.08;
      ring.y += ring.driftY * 0.08;
      ring.alpha = clamp(lerp(1, 0, ring.radius / ring.maxRadius), 0, 1);

      context.beginPath();
      context.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
      context.lineWidth = ring.strokeWidth;
      context.strokeStyle = `hsla(${ring.hue}, 90%, 65%, ${ring.alpha})`;
      context.stroke();

      if (ring.radius >= ring.maxRadius) {
        app.bursts.splice(index, 1);
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
