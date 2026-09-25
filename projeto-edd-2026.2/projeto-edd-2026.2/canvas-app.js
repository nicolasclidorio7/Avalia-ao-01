import { ArrayContainer } from './array-container.js';

export class CanvasApp {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
 
    const capacity = 10;
    const cellSize = 60;
    const padding = 10;
    const width = capacity * (cellSize + padding) + padding;
 
    this.array = new ArrayContainer(
      (canvas.width - width) / 2,
      130,
      capacity,
      cellSize,
      padding
    );
 
    this.lastTime = 0;
    requestAnimationFrame((t) => this.loop(t));
  }
 
  // Ponto de partida do quadrado: topo central do canvas
  get spawnPoint() {
    return { x: this.canvas.width / 2 - this.array.cellSize / 2, y: 10 };
  }
 
  addValue(value) {
    const { x, y } = this.spawnPoint;
    return this.array.add(value, x, y);
  }
 
  loop(time) {
    const deltaTime = time - this.lastTime;
    this.lastTime = time;
 
    this.array.update(deltaTime);
    this.draw();
 
    requestAnimationFrame((t) => this.loop(t));
  }
 
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.array.draw(this.ctx);
  }
}
