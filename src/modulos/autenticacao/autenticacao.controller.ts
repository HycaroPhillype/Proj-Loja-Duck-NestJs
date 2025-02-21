import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './autenticacao.service';
import { AuthenticDTO } from './dto/autentica.dto';

@Controller('autenticacao')
export class AuthenticationController {
  constructor(private readonly autenticacaoService: AuthenticationService) {}

  @Post('login')
  login(@Body() { email, senha }: AuthenticDTO) {
    return this.autenticacaoService.login(email, senha);
  }
}
