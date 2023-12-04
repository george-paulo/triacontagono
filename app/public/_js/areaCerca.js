function calcularArea() {
    console.log('Área calculada');
    let inputNome = document.querySelector('[name=nome]');
    let nome = inputNome.value;
    let inputLado = document.querySelector('[name=lado]');
    let lado = parseFloat(inputLado.value);

    inserir({
        nome,
        lado
    });
    listar();
}

let traducoes = {
    'pt-BR': {
        'senha_em_branco': 'A senha não pode ser em branco!',
        'cerca_cadastrada': 'Cerca cadastrada com sucesso!',
        'cerca_apagada': 'Cerca apagada com sucesso!'
    },
    'en': {
        'senha_em_branco': 'Password cannot be empty!'
    }
};

async function inserir(cerca) {
    console.log('Área Inserida');
    try {
        let divResposta = document.querySelector('#resposta');
        let dados = new URLSearchParams(cerca);
        let resposta = await fetch('/triacontagono', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dados
        });

        if (!resposta.ok) {
            throw new Error('Erro ao criar cerca');
        }

        try {
            atualizarEstilo('cerca_cadastrada');
            let respostaJson = await resposta.json();
            let mensagem = respostaJson.mensagem;
            divResposta.innerText = traducoes['pt-BR'][mensagem];
        } catch (error) {
            console.error('Erro ao inserir cerca:', error.message);
            atualizarEstilo('');
            divResposta.innerText = 'Erro ao criar cerca. Tente novamente mais tarde.';
        }
    } catch (error) {
        console.error('Erro ao inserir cerca:', error.message);
        atualizarEstilo('');
        divResposta.innerText = 'Erro ao criar cerca. Tente novamente mais tarde.';
    }
}

async function listar() {
    console.log('Área Listada');
    let divCercas = document.querySelector('#triacontagono');
    divCercas.innerText = 'Carregando...';
    let resposta = await fetch('/triacontagono');
    let cercas = await resposta.json();
    divCercas.innerHTML = '';
    for (let cerca of cercas) {
        let linha = document.createElement('tr');
        let colunaId = document.createElement('td');
        let colunaNome = document.createElement('td');
        let colunaLado = document.createElement('td');
        let colunaAcoes = document.createElement('td');
        let botaoEditar = document.createElement('button');
        let botaoApagar = document.createElement('button');
        colunaId.innerText = cerca.id;
        colunaNome.innerText = cerca.nome;
        colunaLado.innerText = cerca.lado;
        botaoEditar.innerText = 'Editar';
        botaoEditar.onclick = function () {
            editar(cerca.id);
        };
        botaoApagar.onclick = function () {
            apagar(cerca.id);
        };
        botaoApagar.innerText = 'Apagar';
        linha.appendChild(colunaId);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaLado);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoApagar);
        linha.appendChild(colunaAcoes);
        divCercas.appendChild(linha);
    }
}

async function editar(id) {
    console.log('Área Editar');
    alert('editar' + id);
}

async function apagar(id) {
    console.log('Área Apagar');
    let divResposta = document.querySelector('#resposta');
    if (confirm('Quer apagar o #' + id + '?')) {
        let resposta = await fetch('/triacontagono/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        let respostaJson = await resposta.json();
        let mensagem = respostaJson.mensagem;
        divResposta.innerText = traducoes['pt-BR'][mensagem];
        listar();
    }
}

function atualizarEstilo(mensagem) {
    let divResposta = document.querySelector('#resposta');
    if (mensagem === 'Cerca cadastrada' || mensagem === 'Cerca apagada') {
        divResposta.classList.add('grande');
        divResposta.classList.remove('pequena');
    } else {
        divResposta.classList.add('pequena');
        divResposta.classList.remove('grande');
    }
}