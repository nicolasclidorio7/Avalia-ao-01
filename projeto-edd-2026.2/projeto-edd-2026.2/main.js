import { CanvasApp } from './canvas-app.js';
import { FormController } from './form-controller.js';

// =====================================================
// Inicialização
// =====================================================
const app = new CanvasApp(document.getElementById("canvas"));

new FormController(
  document.getElementById("form-valor"),
  document.getElementById("input-valor"),
  document.getElementById("mensagem"),
  app
);
