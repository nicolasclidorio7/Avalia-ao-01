export class FormController {
  constructor(form, input, message, app) {
    this.form = form;
    this.input = input;
    this.message = message;
    this.app = app;
 
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    
    const btnInserirOrdenado = document.getElementById("btn-inserir-ordenado");
    if (btnInserirOrdenado) {
      btnInserirOrdenado.addEventListener("click", (e) => this.handleInsertSorted(e));
    }

    const btnOrdenar = document.getElementById("btn-ordenar");
    if (btnOrdenar) {
      btnOrdenar.addEventListener("click", (e) => this.handleSort(e));
    }

    const btnBuscaSequencial = document.getElementById("btn-busca-sequencial");
    if (btnBuscaSequencial) {
      btnBuscaSequencial.addEventListener("click", (e) => this.handleSequentialSearch(e));
    }

    const btnBuscaBinaria = document.getElementById("btn-busca-binaria");
    if (btnBuscaBinaria) {
      btnBuscaBinaria.addEventListener("click", (e) => this.handleBinarySearch(e));
    }
  }
 
  handleSubmit(event) {
    event.preventDefault();
 
    const value = Number(this.input.value);
    if (this.input.value === "" || Number.isNaN(value)) {
      this.showMessage("Informe um valor numérico.");
      return;
    }
 
    const square = this.app.addValue(value);
    if (!square) {
      this.showMessage("O array está cheio.");
      return;
    }
 
    this.showMessage(`Valor ${value} inserido no índice ${this.app.array.items.length - 1}.`);
    this.input.value = "";
    this.input.focus();
  }

  handleSort(event) {
    event.preventDefault();
    
    if (this.app.array.items.length === 0) {
      this.showMessage("O array está vazio. Adicione valores antes de ordenar.");
      return;
    }
    
    this.app.array.sort();
    this.showMessage("Array ordenado com sucesso!");
  }

  handleInsertSorted(event) {
    event.preventDefault();

    const value = Number(this.input.value);
    if (this.input.value === "" || Number.isNaN(value)) {
      this.showMessage("Informe um valor numérico.");
      return;
    }

    const square = this.app.array.addSorted(value, this.app.spawnPoint.x, this.app.spawnPoint.y);
    if (!square) {
      this.showMessage("O array está cheio.");
      return;
    }

    this.showMessage(`Valor ${value} inserido ordenadamente no índice ${this.app.array.items.indexOf(square)}.`);
    this.input.value = "";
    this.input.focus();
  }

  handleSequentialSearch(event) {
    event.preventDefault();
    
    const inputBusca = document.getElementById("input-busca");
    const value = Number(inputBusca.value);

    if (inputBusca.value === "" || Number.isNaN(value)) {
      this.showMessage("Informe um valor numérico para buscar.");
      return;
    }

    if (this.app.array.items.length === 0) {
      this.showMessage("O array está vazio. Adicione valores antes de buscar.");
      return;
    }

    const result = this.app.array.sequentialSearch(value);
    if (result.index !== -1) {
      this.showMessage(`✓ Valor ${value} encontrado no índice ${result.index}. Comparações: ${result.comparisons}`);
    } else {
      this.showMessage(`✗ Valor ${value} não encontrado no array. Comparações: ${result.comparisons}`);
    }
    inputBusca.value = "";
  }

  handleBinarySearch(event) {
    event.preventDefault();
    
    const inputBusca = document.getElementById("input-busca");
    const value = Number(inputBusca.value);

    if (inputBusca.value === "" || Number.isNaN(value)) {
      this.showMessage("Informe um valor numérico para buscar.");
      return;
    }

    if (this.app.array.items.length === 0) {
      this.showMessage("O array está vazio. Adicione valores antes de buscar.");
      return;
    }

    const result = this.app.array.binarySearch(value);
    if (result.index !== -1) {
      this.showMessage(`✓ Valor ${value} encontrado no índice ${result.index}. Comparações: ${result.comparisons}`);
    } else {
      this.showMessage(`✗ Valor ${value} não encontrado no array. Comparações: ${result.comparisons}`);
    }
    inputBusca.value = "";
  }
 
  showMessage(text) {
    this.message.textContent = text;
  }
}
