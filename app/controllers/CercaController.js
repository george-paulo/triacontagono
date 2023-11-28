const bcrypt = require('bcrypt');
const utils = require('../lib/utils');
const Cerca = require('../lib/triacontagono/Cerca');

class CercaController {
    constructor(cercaDao) {
        this.cercaDao = cercaDao;
    }

    index(req, res) {
        utils.renderizarEjs(res, './views/index.ejs');
    }

    area(req, res) {
        let corpoTexto = '';
        req.on('data', function (pedaco) {
            corpoTexto += pedaco;
        });
        req.on('end', () => {
            let propriedades = corpoTexto.split('&');
            let query = {};
            for (let propriedade of propriedades) {
                let [variavel, valor] = propriedade.split('=');
                query[variavel] = valor;
            }
            let cerca = new Cerca();
            cerca.nome = query.nome;
            cerca.lado = parseFloat(query.lado);

            utils.renderizarEjs(res, './views/triacontagono.ejs', cerca);
        });
    }

    async listar(req, res) {
        let cercas = await this.cercaDao.listar();
        let dados = cercas.map(cerca => {
            return {
                ...cerca,
                area: cerca.calcularArea(), 
            };
        });

        utils.renderizarJSON(res, dados);
    }

    async inserir(req, res) {
        let cerca = await this.getCercaFromRequest(req);
        try {
            this.cercaDao.inserir(cerca);
            utils.renderizarJSON(res, {
                cerca: {
                    ...cerca,
                    area: cerca.calcularArea(), 
                },
                mensagem: 'Cerca Cadastrada Com Sucesso'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    async alterar(req, res) {
        let cerca = await this.getCercaFromRequest(req);
        let [url, queryString] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        try {
            this.cercaDao.alterar(id, cerca);
            utils.renderizarJSON(res, {
                mensagem: 'Cerca alterada Com Sucesso'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    apagar(req, res) {
        let [url, queryString] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        this.cercaDao.apagar(id);
        utils.renderizarJSON(res, {
            mensagem: 'Cerca Apagada Com Sucesso',
            id: id
        });
    }

    async getCercaFromRequest(req) {
        let corpo = await utils.getCorpo(req);
        let cerca = new Cerca(
            corpo.nome,
            parseFloat(corpo.lado),
            corpo.papel
        );
        return cerca;
    }
}

module.exports = CercaController;