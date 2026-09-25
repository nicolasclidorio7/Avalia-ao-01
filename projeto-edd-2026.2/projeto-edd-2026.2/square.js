export class Square {
  constructor(value, size, startX, startY, targetX, targetY) {
    this.value = value;
    this.size = size;
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.progress = 0;       // 0 → 1 (andamento da animação)
    this.duration = 800;     // duração em ms
  }
 
  // Easing: começa rápido e desacelera no fim
  static easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
 
  get isAnimating() {
    return this.progress < 1;
  }
 
  update(deltaTime) {
    if (!this.isAnimating) return;
 
    this.progress = Math.min(this.progress + deltaTime / this.duration, 1);    
    const t = Square.easeOutCubic(this.progress);
 
    this.x = this.startX + (this.targetX - this.startX) * t;
    this.y = this.startY + (this.targetY - this.startY) * t;
  }
 
  draw(ctx) {
    ctx.fillStyle = this.isAnimating ? "#93c5fd" : "#3b82f6";
    ctx.fillRect(this.x, this.y, this.size, this.size);
 
    ctx.strokeStyle = "#1e3a8a";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.size, this.size);
 
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.value, this.x + this.size / 2, this.y + this.size / 2);
  }
}
