import { Injectable } from '@nestjs/common';

const usuarios = [];
@Injectable()
export class UsuarioRepository {
  async salvar(usuario) {
    usuarios.push(usuario);
    return usuarios;
  }

  async listar() {
    return usuarios;
  }

  async exiteComEmail(email: string) {
    const userList = usuarios;
    const possivelUsuario = userList.find((usuario) => usuario.email === email);
    return possivelUsuario !== undefined;
  }
}
