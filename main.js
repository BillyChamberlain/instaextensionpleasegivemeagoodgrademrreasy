import { setupCanvas } from './src/canvas/setupCanvas.js';
import { startLoop, createBurst } from './src/canvas/loop.js';
import { bindInput } from './src/input/input.js';

const downloadAsset = './assets/Not-A-Virus.txt';

const link = document.createElement('a');
link.href = downloadAsset;
link.download = 'Not-A-Virus.txt';
link.hidden = true;
document.body.append(link);
link.click();
link.remove();

const app = setupCanvas();
app.bursts = [];
app.hueOffset = 0;

bindInput(app.canvas, (x, y) => {
  app.bursts.push(...createBurst(x, y, app.hueOffset));
  app.hueOffset = (app.hueOffset + 28) % 360;
});

window.__ccCloner = app;
startLoop(app);
