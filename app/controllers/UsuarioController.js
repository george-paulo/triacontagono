const bcrypt = require('bcrypt');
const utils = require('../lib/utils');
const Usuario = require('../lib/triacontagono/Usuario');

class UsuariosController {
    constructor(usuariosDao) {
        this.usuariosDao = usuariosDao;
    }

    async listar(req, res) {
        try {
            const usuarios = await this.usuariosDao.listar();
            const dados = usuarios.map(usuario => ({ ...usuario }));

            utils.renderizarJSON(res, dados);
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    async inserir(req, res) {
        try {
            const usuario = await this.getUsuarioFromRequest(req);
            usuario.id = await this.usuariosDao.inserir(usuario);

            utils.renderizarJSON(res, { usuario, mensagem: 'Usuário cadastrado com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    async alterar(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.getUsuarioFromRequest(req);

            this.usuariosDao.alterar(id, usuario);

            utils.renderizarJSON(res, { mensagem: 'Usuário alterado com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    async apagar(req, res) {
        try {
            const { id } = req.params;

            this.usuariosDao.apagar(id);

            utils.renderizarJSON(res, { mensagem: 'Usuário apagado com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    async getUsuarioFromRequest(req) {
        const corpo = await utils.getCorpo(req);
        const usuario = new Usuario(corpo.nome, corpo.senha, corpo.papel);
        return usuario;
    }
}

module.exports = UsuariosController;