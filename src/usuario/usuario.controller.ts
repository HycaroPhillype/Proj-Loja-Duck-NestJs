import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario-dto';
import { UserEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid';
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosUsuario: CriaUsuarioDTO) {
    const userEntity = new UserEntity();
    userEntity.email = dadosUsuario.email;
    userEntity.senha = dadosUsuario.senha;
    userEntity.nome = dadosUsuario.nome;
    userEntity.id = uuid();

    this.usuarioRepository.salvar(userEntity);
    return { id: userEntity.id, message: 'Usuário criado com sucesso'}
  }

  @Get()
  async listusuarios() {
    return this.usuarioRepository.listar();
  }
}
