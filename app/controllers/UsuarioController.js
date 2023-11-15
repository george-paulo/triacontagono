const bcrypt = require('bcrypt');
const utils = require('../lib/utils');
const UsuarioDao = require('../lib/triacontagono/UsuarioDao');
const Usuario = require('../lib/triacontagono/Usuario');

class UsuarioController {
    constructor(usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    index(req, res) {
        const usuarios = this.usuarioDao.listar();
        utils.renderizarJSON(res, usuarios);
    }

    async inserir(req, res) {
        try {
            const usuario = await this.getUsuarioFromRequest(req);
            this.usuarioDao.inserir(usuario);
    
            utils.renderizarJSON(res, { mensagem: 'Usuário cadastrado com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }
  
    async alterar(req, res) {
        try {
            const { id } = req.params;
            const usuario = await this.getUsuarioFromRequest(req);
    
            this.usuarioDao.alterar(id, usuario);
    
            utils.renderizarJSON(res, { mensagem: 'Usuário alterado com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    async apagar(req, res) {
        try {
            const { id } = req.params;
    
            this.usuarioDao.apagar(id);
    
            utils.renderizarJSON(res, { mensagem: 'Usuário apagado com sucesso.' });
        } catch (e) {
            utils.renderizarJSON(res, { mensagem: e.message }, 400);
        }
    }

    validar(usuario) {
        if (!usuario.nome || usuario.nome === '') {
            throw new Error('Nome do usuário não pode estar em branco.');
        }
        if (!usuario.papel || usuario.papel === '') {
            throw new Error('Papel do usuário não pode estar em branco.');
        }
    }

    autenticar(nome, senha) {
        const usuarios = this.usuarioDao.listar();
    
        for (const usuario of usuarios) {
            if (usuario.nome === nome && bcrypt.compareSync(senha, usuario.senha)) {
                return {
                    nome: usuario.nome,
                    papel: usuario.papel
                };
            }
        }
        
        return null;
    }

    async getUsuarioFromRequest(req) {
        const corpo = await utils.getCorpo(req);
        const usuario = new Usuario(corpo.nome, corpo.papel);
        return usuario;
    }
}

module.exports = UsuarioController;