class Cerca {
    constructor(nome, lado) {
        this.nome = nome;
        this.lado = lado;
    }

    calcularArea() {
        const pi = Math.PI;
        const area = (30 * this.lado * this.lado) / (4 * (1 / Math.tan(pi / 30)));
        return area;
    }
}

module.exports = Cerca;