import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/CriaUsuario-dto';
import { ListUserDTO } from './dto/Listausuario.dto';
import { UpdateUserDTO } from './dto/UpdateUsers.dto';
import { UserService } from './usuario.service';
import { HashearPasswordPipe } from '../../resources/pipes/hashear-senha.pipe';
@Controller('/usuarios')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  @Post()
  async createUsers(
    @Body() dataUser: CriaUsuarioDTO,
    @Body('senha', HashearPasswordPipe) passwordHasheada: string
  ) {

    const userCreate = await this.userService.createUser({
      ...dataUser,
      senha: passwordHasheada
    })

    return {
      user: new ListUserDTO(userCreate.id, userCreate.nome),
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
