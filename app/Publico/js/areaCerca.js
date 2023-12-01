function calcularCerca() {
    const nome = document.querySelector('input[name="nome"]').value;
    const lado = parseFloat(document.querySelector('input[name="lado"]').value);
    const resposta = document.getElementById('resposta');

    const area = calcularAreaCerca(lado);
    let tamanho;
    if (area > 200) {
        tamanho = 'Grande';
    } else {
        tamanho = 'Pequena';
    }
    resposta.innerHTML = `Olá, ${nome}. Sua cerca tem ${lado} metros de lado. A área dela é ${area.toFixed(2)} metros quadrados.`;
    resposta.classList.add(tamanho.toLowerCase()); 

    return tamanho; 
}

function calcularAreaCerca(lado) {
    const pi = Math.PI;
    const area = (30 * lado * lado) / (4 * (1 / Math.tan(pi / 30)));
    return area.toFixed(2);
}

function grande_pequena() {
    const lado = parseFloat(document.querySelector('input[name="lado"]').value);
    const area = calcularAreaCerca(lado);
    return area > 200; 
}

function cerca() {
    return grande_pequena() ? 'Grande' : 'Pequena';
}
