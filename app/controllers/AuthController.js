const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');
const CercaDao = require('../lib/triacontagono/CercaDao');

class AuthController {
    constructor(cercaDao) {
        this.cercaDao = cercaDao;
        this.SEGREDO_JWT = process.env.SEGREDO_JWT;
    }

    index(req, res) {
        utils.renderizarEjs(res, './views/login.ejs');
    }

    async logar(req, res) {
        try {
            const corpo = await utils.getCorpo(req);
            const { nome, senha } = JSON.parse(corpo);

            const usuario = this.cercaDao.autenticar(nome, senha);

            if (usuario) {
                const token = jwt.sign({ nome: usuario.nome, papel: usuario.papel }, this.SEGREDO_JWT);
                utils.renderizarJSON(res, {
                    token,
                    mensagem: 'Usuário logado com sucesso!',
                });
            } else {
                utils.renderizarJSON(res, {
                    mensagem: 'Usuário ou senha inválidos!',
                }, 401);
            }
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: 'Erro ao processar a solicitação.',
            }, 500);
        }
    }

    autorizar(papeisPermitidos) {
        return (req, res, proximoControlador) => {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const usuario = jwt.verify(token, this.SEGREDO_JWT);

                if (papeisPermitidos.includes(usuario.papel) || papeisPermitidos.length === 0) {
                    req.usuario = usuario;
                    proximoControlador();
                } else {
                    utils.renderizarJSON(res, {
                        mensagem: 'Não autorizado!',
                    }, 403);
                }
            } catch (e) {
                utils.renderizarJSON(res, {
                    mensagem: 'Não autenticado!',
                }, 401);
            }
        };
    }
}

module.exports = AuthController;
