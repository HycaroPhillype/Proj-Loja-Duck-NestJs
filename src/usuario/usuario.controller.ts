import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario-dto';
import { UserEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/Listausuario.dto';
import { UpdateUserDTO } from './dto/UpdateUsers.dto';
@Controller('/usuarios')
export class UsuarioController {
  constructor(private userRepository: UsuarioRepository) {}

  @Post()
  async createUsers(@Body() dadosUsuario: CriaUsuarioDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dadosUsuario.email;
    userEntity.senha = dadosUsuario.senha;
    userEntity.nome = dadosUsuario.nome;
    userEntity.id = uuid();

    this.userRepository.salvar(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.nome),
      message: 'Usuário criado com sucesso'}
  }

  @Get('/:id')
  async listUserById(@Param('id') id: string) {
    const user = await this.userRepository.searchId(id);
    return {
      user,
      message: 'Usuário encontrado com sucesso',
    };
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.userRepository.list();
    const usersList = usersSaved.map(
      user => new ListUserDTO(
        user.id,
        user.nome
      )
    );

    return usersList;
  }

  @Put('/:id')
  async updaterUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const userUpdate = await this.userRepository.update(id, newData);
    return {
      user: userUpdate,
      message: 'Usuário atulizado com êxito',
    }
  }
@Delete('/:id')
async removeUser(@Param('id') id: string) {
  const removedUser = await this.userRepository.remove(id)
  return {
    user: removedUser,
    message: 'Usuário removido com êxito!'
  }
}
}
