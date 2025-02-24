import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface UsuerPayload {
  sub: string;
  nameUser: string;
}
@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senhaInserted: string) {
    const user = await this.userService.searchByEmail(email);

    const userAuthentic = await bcrypt.compare(senhaInserted, user.senha);

    if (!userAuthentic) {
      throw new UnauthorizedException('O email ou a senha está incorreto.');
    }

    const payload: UsuerPayload = {
      sub: user.id,
      nameUser: user.nome
    };

    return {
      token_access: await this.jwtService.signAsync(payload),
    }

  }
}
