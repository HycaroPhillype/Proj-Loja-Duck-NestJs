import { Injectable } from '@nestjs/common';
import { UserEntity } from './usuario.entity';

const users: UserEntity[] = [];
@Injectable()
export class UsuarioRepository {
  async salvar(usuario: UserEntity): Promise<UserEntity> {
    users.push(usuario);
    return usuario; //AQUI ESTAVA PASSANDO A LISTA TODA QUE ESTA NA LINHA 3, AI MUDEI APENAS PARA O QUE ESTA SENDO PASSADO NA LINHA 6
  }

  async listar() {
    return users;
  }

  async exiteComEmail(email: string) {
    const userList = users;
    const possivelUsuario = userList.find((usuario) => usuario.email === email);
    return possivelUsuario !== undefined;
  }

  async update(id: string, dataTheUpdate: Partial<UserEntity>) {
    const userList2 = users
    const possibleUser = userList2.find(
      (userSave) => userSave.id === id
    );

    if(!possibleUser) {
      throw new Error('Usuário não existe');
    }

    Object.entries(dataTheUpdate).forEach(([key, value]) => {
      if(key === 'id') {
        return;
      }

      possibleUser[key] = value;
    });

    return possibleUser;
  }
}
