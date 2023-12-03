function calcularArea() {
    let inputNome = document.querySelector('[name=nome]');
    let nome = inputNome.value;
    let inputLado = document.querySelector('[name=lado]');
    let lado = parseFloat(inputLado.value);
    const pi = Math.PI;
    let area = (30 * lado * lado) / (4 * (1 / Math.tan(pi / 30)));
    let grande_pequena = (area >= 10 && area <= 20);

    let divResposta = document.querySelector('#resposta');
    let div = document.createElement('div');
    div.textContent = 'Olá, ' + nome + '! Sua cerca tem ' + lado + ' metros de lado. A área dela é ' + area + ' metros quadrados.';

    if (grande_pequena) {
        div.classList.add('padrao');
        div.classList.remove('npadrao');
    } else {
        div.classList.remove('padrao');
        div.classList.add('npadrao');
    }

    divResposta.append(div);
}