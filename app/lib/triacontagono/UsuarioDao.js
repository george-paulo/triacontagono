class UsuarioDao {
    constructor() {
        this.usuarios = [];
    }

    listar() {
        return this.usuarios;
    }

    inserir(usuario) {
        this.validar(usuario);
        this.usuarios.push(usuario);
    }

    alterar(id, usuario) {
        if (id == null || id == undefined || this.usuarios[id] == undefined)
            throw new Error('id_usuario_invalido');
        this.validar(usuario);
        this.usuarios[id] = usuario;
    }

    apagar(id) {
        if (id == null || id == undefined || this.usuarios[id] == undefined)
            throw new Error('id_usuario_invalido');
        this.usuarios.splice(id, 1);
    }

    validar(usuario) {
        if (!usuario || typeof usuario !== 'object') {
            throw new Error('usuario_invalido');
        }
    }
}

module.exports = UsuarioDao;