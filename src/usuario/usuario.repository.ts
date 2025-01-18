import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from './usuario.entity';

let users: UserEntity[] = [];
@Injectable()
export class UsuarioRepository {
  userList3: any;
  async salvar(usuario: UserEntity): Promise<UserEntity> {
    users.push(usuario);
    return usuario; //AQUI ESTAVA PASSANDO A LISTA TODA QUE ESTA NA LINHA 3, AI MUDEI APENAS PARA O QUE ESTA SENDO PASSADO NA LINHA 6
  }

  async list() {
    return users;
  }

  async exiteComEmail(email: string) {
    const userList = users;
    const possivelUsuario = userList.find((usuario) => {
      if (usuario.email === email) {
        return usuario;
      }
    });
    return possivelUsuario !== undefined;
  }
  public searchId(id: string) {
    const userList2 = users;
    const possibleUser = userList2.find((userSave) => userSave.id === id);

    if (!possibleUser) throw new BadRequestException('Usuário não existe');

    return possibleUser;
  }

  async update(id: string, dataTheUpdate: Partial<UserEntity>) {
    const userExists = this.searchId(id);

    Object.entries(dataTheUpdate).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      userExists[key] = value;
    });

    return userExists;
  }

  async remove(id: string) {
    const userExists = this.searchId(id);
    users = users.filter((userSave) => userSave.id !== userExists.id);
  }
}
