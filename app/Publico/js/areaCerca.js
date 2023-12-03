function calcularCerca() {
    let inputNome = document.querySelector('[name=nome]');
    let nome = inputNome.value;
    let inputLado = document.querySelector('[name=lado]');
    let lado = parseFloat(inputLado.value);
    const pi = Math.PI;
    let area = (30 * lado * lado) / (4 * (1 / Math.tan(pi / 30)));
    let divResposta = document.querySelector('#resposta');
    let div = document.createElement('div');
    div.textContent = 'Olá, ' + nome + '! Sua cerca tem ' + lado + ' metros de lado. A área dela é ' + area + ' metros quadrados.';

    divResposta.innerHTML = '';

    if (area > 200) {
        div.textContent += ' É uma área grande!';
        div.classList.add('grande');
    } else {
        div.textContent += ' É uma área pequena!';
        div.classList.add('pequena');
    }

    divResposta.append(div);

    return false;
}
