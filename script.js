(() => {
  "use strict";

  // --- Controle do Multi-Step Wizard ---
  const fieldsets = document.querySelectorAll("fieldset");
  const nextButtons = document.querySelectorAll(".next");
  const prevButtons = document.querySelectorAll(".previous");
  const progressBar = document.querySelectorAll("#progressbar li");
  let currentStep = 0;

  /**
   * Atualiza a exibição do step (etapa) atual
   * @param {number} step - Índice do fieldset a ser exibido
   */
  function showStep(step) {
    fieldsets.forEach((fs, index) => {
      fs.classList.toggle("active", index === step);
    });
    progressBar.forEach((li, index) => {
      li.classList.toggle("active", index <= step);
    });
  }

  // Permite clicar no progress bar para voltar a etapas anteriores
  progressBar.forEach((li, index) => {
    li.addEventListener("click", () => {
      if (index <= currentStep) {
        currentStep = index;
        showStep(currentStep);
      }
    });
  });

  /**
   * Exibe uma mensagem de erro logo abaixo do input
   * @param {HTMLElement} input - Elemento input que não foi preenchido
   * @param {string} message - Mensagem de erro a ser exibida
   */
  function showError(input, message) {
    clearError(input);
    input.classList.add("error");
    const errorSpan = document.createElement("span");
    errorSpan.className = "error-message";
    errorSpan.textContent = message;
    input.parentNode.appendChild(errorSpan);
  }

  /**
   * Remove a mensagem de erro de um input
   * @param {HTMLElement} input - Elemento input do qual remover a mensagem de erro
   */
  function clearError(input) {
    input.classList.remove("error");
    const error = input.parentNode.querySelector(".error-message");
    if (error) {
      error.remove();
    }
  }

  /**
   * Valida os campos obrigatórios (data-required="true") do fieldset atual
   * @param {number} step - Índice do fieldset a ser validado
   * @returns {boolean} - Retorna true se todos os campos obrigatórios estiverem preenchidos
   */
  function validateStep(step) {
    const currentFieldset = fieldsets[step];
    let valid = true;
    currentFieldset.querySelectorAll("[data-required='true']").forEach(input => {
      if (!input.value.trim()) {
        valid = false;
        showError(input, "Este campo é obrigatório.");
      } else {
        clearError(input);
      }
    });
    return valid;
  }

  nextButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Valida os campos obrigatórios antes de avançar
      if (!validateStep(currentStep)) {
        return;
      }
      if (currentStep < fieldsets.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // --- Cálculo Automático do Valor Total de Abertura ---
  function updateTotalAbertura() {
    const taxas = parseFloat(document.getElementById('taxas_servicos').value.replace(',', '.')) || 0;
    const certPj = parseFloat(document.getElementById('cert_digital_pj').value.replace(',', '.')) || 0;
    const certPf = parseFloat(document.getElementById('cert_digital_pf').value.replace(',', '.')) || 0;
    const total = taxas + certPj + certPf;
    document.getElementById('valor_total_abertura').value = total.toFixed(2).toString().replace('.', ',');
  }

  document.getElementById('taxas_servicos').addEventListener('input', updateTotalAbertura);
  document.getElementById('cert_digital_pj').addEventListener('input', updateTotalAbertura);
  document.getElementById('cert_digital_pf').addEventListener('input', updateTotalAbertura);
  window.addEventListener('load', updateTotalAbertura);

  // --- Exibe campo para preenchimento manual do banco ---
  document.getElementById('banco').addEventListener('change', function() {
    const manualGroup = document.getElementById('banco-manual-group');
    manualGroup.style.display = (this.value === 'outro') ? 'block' : 'none';
  });

  // --- Inicializa o Flatpickr para os campos de data (formato dd/mm/aaaa) ---
  flatpickr("#data_atual", { dateFormat: "d/m/Y",locale:"pt" });
  flatpickr("#inicio_negociacao", { dateFormat: "d/m/Y",locale:"pt" });
  flatpickr("#data_vencimento", { dateFormat: "d/m/Y",locale:"pt" });
  flatpickr("#data_limite", { dateFormat: "d/m/Y",locale:"pt" });

  // --- Geração Dinâmica dos Campos dos Sócios ---
  const quantidadeSociosInput = document.getElementById("quantidade_socios");
  const sociosContainer = document.getElementById("socios-container");

  /**
   * Gera dinamicamente os campos para cada sócio, conforme a quantidade informada.
   */
  function generateSociosFields() {
    // Limpa o container
    sociosContainer.innerHTML = "";
    const quantidade = parseInt(quantidadeSociosInput.value) || 0;

    // Para cada sócio, cria um conjunto de campos
    for (let i = 1; i <= quantidade; i++) {
      const div = document.createElement("div");
      div.classList.add("socio-fields");

      // Cabeçalho
      const header = document.createElement("h3");
      header.textContent = "Dados do Sócio " + i;
      div.appendChild(header);

      // Nome Completo
      const nomeDiv = document.createElement("div");
      nomeDiv.classList.add("form-group");
      const nomeLabel = document.createElement("label");
      nomeLabel.setAttribute("for", "nome_socio" + i);
      nomeLabel.innerHTML = "Nome Completo <small>*</small>";
      const nomeInput = document.createElement("input");
      nomeInput.type = "text";
      nomeInput.id = "nome_socio" + i;
      nomeInput.name = "nome_socio" + i;
      nomeInput.setAttribute("data-required", "true");
      nomeInput.setAttribute("aria-required", "true");
      nomeDiv.appendChild(nomeLabel);
      nomeDiv.appendChild(nomeInput);
      div.appendChild(nomeDiv);

      // Telefone de Contato
      const telDiv = document.createElement("div");
      telDiv.classList.add("form-group");
      const telLabel = document.createElement("label");
      telLabel.setAttribute("for", "telefone_socio" + i);
      telLabel.textContent = "Telefone de Contato";
      const telInput = document.createElement("input");
      telInput.type = "text";
      telInput.id = "telefone_socio" + i;
      telInput.name = "telefone_socio" + i;
      telDiv.appendChild(telLabel);
      telDiv.appendChild(telInput);
      div.appendChild(telDiv);

      // Endereço
      const endDiv = document.createElement("div");
      endDiv.classList.add("form-group");
      const endLabel = document.createElement("label");
      endLabel.setAttribute("for", "endereco_socio" + i);
      endLabel.textContent = "Endereço";
      const endInput = document.createElement("input");
      endInput.type = "text";
      endInput.id = "endereco_socio" + i;
      endInput.name = "endereco_socio" + i;
      endDiv.appendChild(endLabel);
      endDiv.appendChild(endInput);
      div.appendChild(endDiv);

      // Estado Civil (dropdown)
      const estadoDiv = document.createElement("div");
      estadoDiv.classList.add("form-group");
      const estadoLabel = document.createElement("label");
      estadoLabel.setAttribute("for", "estado_civil_socio" + i);
      estadoLabel.textContent = "Estado Civil";
      const estadoSelect = document.createElement("select");
      estadoSelect.id = "estado_civil_socio" + i;
      estadoSelect.name = "estado_civil_socio" + i;
      const estados = [
        { value: "solteiro", text: "Solteiro(a)" },
        { value: "casado", text: "Casado(a)" },
        { value: "divorciado", text: "Divorciado(a)" },
        { value: "viuvo", text: "Viúvo(a)" },
        { value: "separado", text: "Separado(a)" }
      ];
      estados.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        estadoSelect.appendChild(option);
      });
      estadoDiv.appendChild(estadoLabel);
      estadoDiv.appendChild(estadoSelect);
      div.appendChild(estadoDiv);

      // Contato
      const contatoDiv = document.createElement("div");
      contatoDiv.classList.add("form-group");
      const contatoLabel = document.createElement("label");
      contatoLabel.setAttribute("for", "contato_socio" + i);
      contatoLabel.textContent = "Contato";
      const contatoInput = document.createElement("input");
      contatoInput.type = "text";
      contatoInput.id = "contato_socio" + i;
      contatoInput.name = "contato_socio" + i;
      contatoDiv.appendChild(contatoLabel);
      contatoDiv.appendChild(contatoInput);
      div.appendChild(contatoDiv);

      // Percentual do Capital Social
      const percDiv = document.createElement("div");
      percDiv.classList.add("form-group");
      const percLabel = document.createElement("label");
      percLabel.setAttribute("for", "percentual_capital_socio" + i);
      percLabel.textContent = "% do Capital Social";
      const percInput = document.createElement("input");
      percInput.type = "number";
      percInput.id = "percentual_capital_socio" + i;
      percInput.name = "percentual_capital_socio" + i;
      percInput.value = "100";
      percDiv.appendChild(percLabel);
      percDiv.appendChild(percInput);
      div.appendChild(percDiv);

      // Valor do Capital Social
      const valorDiv = document.createElement("div");
      valorDiv.classList.add("form-group");
      const valorLabel = document.createElement("label");
      valorLabel.setAttribute("for", "valor_capital_socio" + i);
      valorLabel.textContent = "Valor do Capital Social (R$)";
      const valorInput = document.createElement("input");
      valorInput.type = "text";
      valorInput.id = "valor_capital_socio" + i;
      valorInput.name = "valor_capital_socio" + i;
      valorInput.value = "0,00";
      valorDiv.appendChild(valorLabel);
      valorDiv.appendChild(valorInput);
      div.appendChild(valorDiv);

      // É Sócio Administrador? (dropdown)
      const adminDiv = document.createElement("div");
      adminDiv.classList.add("form-group");
      const adminLabel = document.createElement("label");
      adminLabel.setAttribute("for", "socio_administrador" + i);
      adminLabel.textContent = "É Sócio Administrador?";
      const adminSelect = document.createElement("select");
      adminSelect.id = "socio_administrador" + i;
      adminSelect.name = "socio_administrador" + i;
      const optSim = document.createElement("option");
      optSim.value = "sim";
      optSim.textContent = "Sim";
      const optNao = document.createElement("option");
      optNao.value = "nao";
      optNao.textContent = "Não";
      optNao.selected = true;
      adminSelect.appendChild(optSim);
      adminSelect.appendChild(optNao);
      adminDiv.appendChild(adminLabel);
      adminDiv.appendChild(adminSelect);
      div.appendChild(adminDiv);

      // Pro-Labore
      const proDiv = document.createElement("div");
      proDiv.classList.add("form-group");
      const proLabel = document.createElement("label");
      proLabel.setAttribute("for", "pro_labore" + i);
      proLabel.textContent = "Pro-Labore (R$)";
      const proInput = document.createElement("input");
      proInput.type = "text";
      proInput.id = "pro_labore" + i;
      proInput.name = "pro_labore" + i;
      proInput.value = "0,00";
      proDiv.appendChild(proLabel);
      proDiv.appendChild(proInput);
      div.appendChild(proDiv);

      // Linha separadora entre os sócios
      const hr = document.createElement("hr");
      div.appendChild(hr);

      // Adiciona o conjunto gerado ao container
      sociosContainer.appendChild(div);
    }
  }

  // Gera os campos quando a página carrega
  window.addEventListener("load", generateSociosFields);
  // Atualiza os campos sempre que o número de sócios mudar
  quantidadeSociosInput.addEventListener("change", generateSociosFields);
})();
