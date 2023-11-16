const utils = require('../lib/utils');
const Cerca = require('../lib/triacontagono/Cerca');

class CercaController {
    constructor(cercaDao) {
        this.cercaDao = cercaDao;
    }

    async index(req, res) {
        utils.renderEjs(res, './views/index.ejs');
    }

    async calcular(req, res) {
        let corpoTexto = '';
        req.on('data', function (pedaco) {
            corpoTexto += pedaco;
        });
        req.on('end', () => {
            let query = utils.decodeUrl(corpoTexto);
            let cerca = new Cerca(query.nome, parseFloat(query.lado));
            utils.renderEjs(res, './views/media.ejs', cerca);
        });
    }

    async listar(req, res) {
        let cercas = this.cercaDao.listar();

        let dados = cercas.map(cerca => ({
            ...cerca,
            area: new Cerca(cerca.nome, cerca.lado).calcularArea()
        }));

        utils.renderJSON(res, dados);
    }

    async criar(req, res) {
        try {
            let cerca = await this.getCercaRequisicao(req);
            this.cercaDao.criar(cerca);

            utils.renderJSON(res, {
                cerca: {
                    ...cerca,
                    area: new Cerca(cerca.nome, cerca.lado).calcularArea()
                },
                mensagem: 'mensagem_cerca_criada'
            });
        } catch (e) {
            utils.renderJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    async atualizar(req, res) {
        try {
            let cerca = await this.getCercaRequisicao(req);
            let id = req.params.id;

            this.cercaDao.atualizar(id, cerca);
            utils.renderJSON(res, {
                mensagem: 'mensagem_cerca_atualizada'
            });
        } catch (e) {
            utils.renderJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    async deletar(req, res) {
        try {
            let id = req.params.id;
            this.cercaDao.deletar(id);

            utils.renderJSON(res, {
                mensagem: 'mensagem_cerca_deletada',
                id: id
            });
        } catch (e) {
            utils.renderJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    async getCercaRequisicao(req) {
        let corpo = await utils.getCorpo(req);
        let cerca = new Cerca(corpo.nome, parseFloat(corpo.lado));
        return cerca;
    }
}

module.exports = CercaController;