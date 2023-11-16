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
        if (id >= 0 && id < this.usuarios.length) {
            this.usuarios[id] = usuario;
        } else {
            throw new Error('Usuário não encontrado para alteração.');
        }
    }

    apagar(id) {
        if (id >= 0 && id < this.usuarios.length) {
            this.usuarios.splice(id, 1);
        } else {
            throw new Error('Usuário não encontrado para exclusão.');
        }
    }

    validar(usuario) {
        if (!usuario.nome || !usuario.papel) {
            throw new Error('Nome ou papel do usuário em branco.');
        }
    }
}

module.exports = UsuarioDao;