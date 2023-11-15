class Cerca {
    constructor(nome, lado) {
        this.nome = nome;
        this.lado = lado;
        this.area = this.calcularArea();
        this.tamanho = this.area > 200 ? 'grande' : 'pequena';
    }

    calcularArea() {
        const pi = Math.PI;
        const area = (30 * this.lado * this.lado) / (4 * (1 / Math.tan(pi / 30)));
        return area;
    }
}

module.exports = Cerca;