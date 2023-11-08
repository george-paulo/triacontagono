const bcrypt = require('bcrypt');
const Cerca = require('../lib/triacontagono/Cerca');
const CercaDao = require('../lib/triacontagono/CercaDao');
const utils = require('../lib/utils');

class CercaController {
    constructor() {
        this.cercas = []; // Inicialize a propriedade cercas como um array vazio.
        this.cercaDao = new CercaDao();
        this.getCercaFromRequest = this.getCercaFromRequest.bind(this);
    }

    index(req, res) {
        utils.renderizarEjs(res, './views/index.ejs');
    }

    async inserir(req, res) {
        try {
            let cerca = await this.getCercaFromRequest(req);
            this.cercaDao.inserir(cerca);

            const area = cerca.calcularArea();
            const mensagem = area > 200 ? 'É uma cerca grande.' : 'É uma cerca pequena';
            const motivo = 'Calcule a Área de uma cerca em forma de triacontagono. Se a Área for maior que 200 metros quadrados, é uma cerca grande. Se for menor que 200 metros quadrados, é uma cerca pequena';

            utils.renderizarJSON(res, { nome: cerca.nome, lado: cerca.lado, area, mensagem, motivo, mensagem: 'Cerca cadastrada com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    alterar(id, cerca) {
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

    autenticar(nome, senha) {
        for (let cerca of this.listar()) {
            if (cerca.nome === nome && bcrypt.compareSync(senha, cerca.senha)) {
                return cerca;
            }
        }
        return null;
    }

    async getCercaFromRequest(req) {
        let corpo = await utils.getCorpo(req);
        let cerca = new Cerca(corpo.nome, parseFloat(corpo.lado));
        return cerca;
    }
}

module.exports = CercaController;
