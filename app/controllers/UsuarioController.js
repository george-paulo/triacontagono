const Usuario = require('../lib/Usuario');
const UsuarioDao = require('../lib/UsuariosDao');
const utils = require('../models/utils');

class UsuarioController {

    constructor() {
      this.usuarioDao = new UsuarioDao();
    }

    listar(req, res) {
      let usuarios = this.usuarioDao.listar()
      utils.renderizarJSON(res, usuarios)
    }

    async inserir(req, res) {
      try {
          var body = await utils.getCorpo(req); 
          let usuario = new Usuario(body.nome, body.papel);
          this.usuarioDao.inserir(usuario);
          utils.renderizarJSON(res, { 
              list: this.usuariosDao.listar(),
              mensagem: 'mensagem_usuario_cadastrado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async alterar(req, res) {
      
      try {
        var body = await utils.getCorpo(req);
        let usuario = new Usuario(body.nome, body.papel);
        this.usuarioDao.alterar(body.id, usuario);
        utils.renderizarJSON(res, { 
            list: this.usuariosDao.listar(),
            mensagem: 'mensagem_usuario_alterado'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }

    async apagar(req, res){
      try {
        var body = await utils.getCorpo(req);
        this.usuarioDao.apagar(body.id);
        utils.renderizarJSON(res, { 
            list: this.usuariosDao.listar(),
            mensagem: 'mensagem_usuario_excluido'
          });
      } 
      catch (e) {
          utils.renderizarJSON(res, {
              mensagem: e.message
          }, 400);
      }
    }
}

module.exports = UsuarioController;