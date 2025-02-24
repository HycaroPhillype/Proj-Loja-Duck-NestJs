import { Module } from '@nestjs/common';
import { AuthenticationService } from './autenticacao.service';
import { AuthenticationController } from './autenticacao.controller';
import { UserModule } from '../usuario/usuario.module';
@Module({
  imports: [UserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AutenticacaoModule {}
