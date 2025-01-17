import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario-dto';
import { UserEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
import { ListUserDTO } from './dto/Listausuario.dto';
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async createUsers(@Body() dadosUsuario: CriaUsuarioDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dadosUsuario.email;
    userEntity.senha = dadosUsuario.senha;
    userEntity.nome = dadosUsuario.nome;
    userEntity.id = uuid();

    this.usuarioRepository.salvar(userEntity);
    return {
      user: new ListUserDTO(userEntity.id, userEntity.nome),
      message: 'Usuário criado com sucesso'}
  }

  @Get()
  async listUsers() {
    const usersSaved = await this.usuarioRepository.listar();
    const usersList = usersSaved.map(
      user => new ListUserDTO(
        user.id,
        user.nome
      )
    );

    return usersList;
  }
}
