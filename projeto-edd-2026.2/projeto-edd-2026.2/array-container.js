import { Square } from './square.js';

export class ArrayContainer {
  constructor(x, y, capacity, cellSize, padding) {
    this.x = x;
    this.y = y;
    this.capacity = capacity;
    this.cellSize = cellSize;
    this.padding = padding;
    this.items = [];
 
    this.width = capacity * (cellSize + padding) + padding;
    this.height = cellSize + padding * 2;
  }
 
  get isFull() {
    return this.items.length >= this.capacity;
  }
 
  // Posição (x, y) da célula de índice i
  slotPosition(index) {
    return {
      x: this.x + this.padding + index * (this.cellSize + this.padding),
      y: this.y + this.padding,
    };
  }
 
  add(value, startX, startY) {
    if (this.isFull) return null;
 
    const target = this.slotPosition(this.items.length);
    const square = new Square(value, this.cellSize, startX, startY, target.x, target.y);
    this.items.push(square);
    return square;
  }

  addSorted(value, startX, startY) {
    if (this.isFull) return null;
 
    // Encontrar a posição correta para inserir o valor
    let insertIndex = this.items.length;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].value > value) {
        insertIndex = i;
        break;
      }
    }
 
    // Criar o novo quadrado
    const target = this.slotPosition(insertIndex);
    const square = new Square(value, this.cellSize, startX, startY, target.x, target.y);
    
    // Inserir na posição correta
    this.items.splice(insertIndex, 0, square);
    
    // Atualizar as posições alvo dos elementos após a inserção
    for (let i = insertIndex + 1; i < this.items.length; i++) {
      const newTarget = this.slotPosition(i);
      this.items[i].targetX = newTarget.x;
      this.items[i].targetY = newTarget.y;
    }
    
    return square;
  }
 
  update(deltaTime) {
    this.items.forEach((item) => item.update(deltaTime));
  }
 
  draw(ctx) {
    // Retângulo externo
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 3;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // Desenha apenas as células utilizadas e os quadrados — um único loop
    for (const [i, item] of this.items.entries()) {
      const { x, y } = this.slotPosition(i);

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#9ca3af";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      ctx.setLineDash([]);

      ctx.fillStyle = "#374151";
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText(`[${i}]`, x + this.cellSize / 2, this.y + this.height + 8);

      item.draw(ctx);
    }
  }

  sort() {
    // Ordena os valores usando Bubble Sort
    for (let i = 0; i < this.items.length - 1; i++) {
      for (let j = 0; j < this.items.length - i - 1; j++) {
        if (this.items[j].value > this.items[j + 1].value) {
          // Troca os valores
          [this.items[j].value, this.items[j + 1].value] = [this.items[j + 1].value, this.items[j].value];
        }
      }
    }
  }

  sequentialSearch(target) {
    let comparisons = 0;
    for (let i = 0; i < this.items.length; i++) {
      comparisons++;
      if (this.items[i].value === target) {
        return { index: i, comparisons };
      }
    }
    return { index: -1, comparisons };
  }

  binarySearch(target) {
    let comparisons = 0;
    let left = 0;
    let right = this.items.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      comparisons++;
      
      if (this.items[mid].value === target) {
        return { index: mid, comparisons };
      } else if (this.items[mid].value < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return { index: -1, comparisons };
  }
}
