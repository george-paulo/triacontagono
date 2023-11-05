class CercaDao {
    constructor() {
        this.cercas = [];
    }

    listar() {
        return this.cercas;
    }

    inserir(cerca) {
        this.validar(cerca);
        this.cercas.push(cerca);
    }

    alterar(id, cerca) {
        this.validar(cerca);
        if (id >= 0 && id < this.cercas.length) {
            this.cercas[id] = cerca;
        } else {
            throw new Error('Cerca não encontrada para alteração.');
        }
    }

    apagar(id) {
        if (id >= 0 && id < this.cercas.length) {
            this.cercas.splice(id, 1);
        } else {
            throw new Error('Cerca não encontrada para exclusão.');
        }
    }

    validar(cerca) {
        if (cerca.nome === '') {
            throw new Error('Nome em branco.');
        }
        if (cerca.lado <= 0 || isNaN(cerca.lado)) {
            throw new Error('Lado da cerca inválido.');
        }
    }
}

module.exports = CercaDao;