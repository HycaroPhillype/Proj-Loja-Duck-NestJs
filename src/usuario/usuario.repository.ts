import { Injectable } from '@nestjs/common';
import { UserEntity } from './usuario.entity';

const usuarios: UserEntity[] = [];
@Injectable()
export class UsuarioRepository {
  async salvar(usuario: UserEntity): Promise<UserEntity> {
    usuarios.push(usuario);
    return usuario; //AQUI ESTAVA PASSANDO A LISTA TODA QUE ESTA NA LINHA 3, AI MUDEI APENAS PARA O QUE ESTA SENDO PASSADO NA LINHA 6
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
