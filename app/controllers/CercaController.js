const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');
const CercaDao = require('../lib/triacontagono/CercaDao');

class CercaController {
    constructor(cercaDao) {
        this.cercaDao = cercaDao;
    }

    index(req, res) {
        utils.renderizarEjs(res, './views/index.ejs');
    }

    async inserir(req, res) {
        try {
            const cerca = await this.getCercaFromRequest(req);
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
        try {
            this.cercaDao.alterar(id, cerca);
            utils.renderizarJSON(res, {
                mensagem: 'Cerca alterada com sucesso.'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    apagar(id) {
        try {
            this.cercaDao.apagar(id);
            utils.renderizarJSON(res, {
                mensagem: 'Cerca apagada com sucesso.',
                id: id
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
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
        const cercas = this.cercaDao.listar();
    
        for (const cerca of cercas) {
            if (cerca.nome === nome && bcrypt.compareSync(senha, cerca.senha)) {
                return {
                    nome: cerca.nome,
                    papel: cerca.papel
                };
            }
        }
        
        return null;
    }
    

    async getCercaFromRequest(req) {
        const corpo = await utils.getCorpo(req);
        const cerca = new Cerca(corpo.nome, parseFloat(corpo.lado));
        return cerca;
    }
}

module.exports = CercaController;
