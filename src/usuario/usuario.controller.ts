import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario-dto';
import { UserEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/Listausuario.dto';
import { UpdateUserDTO } from './dto/UpdateUsers.dto';
import { UserService } from './usuario.service';
@Controller('/usuarios')
export class UsuarioController {
  constructor(
    private userRepository: UsuarioRepository,
    private userService: UserService
  ) {}

  @Post()
  async createUsers(@Body() dadosUsuario: CriaUsuarioDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dadosUsuario.email;
    userEntity.senha = dadosUsuario.senha;
    userEntity.nome = dadosUsuario.nome;
    userEntity.id = uuid();

    this.userService.createUser(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.nome),
      message: 'Usuário criado com sucesso'}
  }

  @Get('/:id')
  async listUserById(@Param('id') id: string) {
    const user = await this.userService.listUser(id);
    return {
      user,
      message: 'Usuário encontrado com sucesso',
    };
  }

  @Get()
  async usersList() {
    return this.userService.listUsers();
  }

  @Put('/:id')
  async userUpdate(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const userUpdate = await this.userService.updateUser(id, newData);
    return {
      user: userUpdate,
      message: 'Usuário atulizado com êxito',
    }
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const removedUser = await this.userService.deleteUser(id)
    return {
      user: removedUser,
      message: 'Usuário removido com êxito!'
    }
  }
}
