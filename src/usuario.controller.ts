import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Get()
  async listUsuario(@Get() mostrarUsuarios) {
    return mostrarUsuarios;
  }

  @Post()
  async criaUsuario(@Body() dadosUsuario) {
    this.usuarioRepository.salvar(dadosUsuario);
    return dadosUsuario;
  }
}
