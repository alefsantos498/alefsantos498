// js/cadastro.js

document.getElementById('cep').addEventListener('blur', function() {
    const cepInput = this;
    const cep = cepInput.value.replace(/\D/g, '');
    const cepError = document.getElementById('cep-error');
    const cepLoading = document.getElementById('cep-loading');

    cepError.textContent = '';

    if (cep !== "") {
        const validacep = /^[0-9]{8}$/;
        if (validacep.test(cep)) {
            // Exibe o spinner enquanto busca o CEP
            cepLoading.style.display = 'block';

            fetch('https://viacep.com.br/ws/' + cep + '/json/')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição do CEP.');
                    }
                    return response.json();
                })
                .then(data => {
                    cepLoading.style.display = 'none';
                    if (!("erro" in data)) {
                        document.getElementById('cidade').value = data.localidade;
                        document.getElementById('estado').value = data.uf;
                    } else {
                        cepError.textContent = "CEP não encontrado.";
                    }
                })
                .catch(error => {
                    cepLoading.style.display = 'none';
                    console.error('Erro:', error);
                    cepError.textContent = "Não foi possível buscar o CEP.";
                });
        } else {
            cepError.textContent = "Formato de CEP inválido. Insira 8 dígitos.";
        }
    }
});
