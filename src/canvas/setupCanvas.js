export function setupCanvas() {
  const canvas = document.getElementById('gameCanvas');

  if (!canvas) {
    throw new Error('Canvas element not found');
  }

  const context = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  return { canvas, context };
}
