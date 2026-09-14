export function bindInput(canvas, onPointerDown) {
  const handler = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (typeof onPointerDown === 'function') {
      onPointerDown(x, y);
    }
  };

  canvas.addEventListener('pointerdown', handler);

  return {
    destroy() {
      canvas.removeEventListener('pointerdown', handler);
    },
  };
}
