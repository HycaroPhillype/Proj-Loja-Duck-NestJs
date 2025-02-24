import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}

  async login(email: string, senhaInserted: string) {
    const user = await this.userService.searchByEmail(email);

    const userAuthentic = await bcrypt.compare(
      senhaInserted,
      user.senha,
    );

    if (!userAuthentic) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    console.log('Usuário autenticado');

  }
}
