import { Module } from '@nestjs/common';
import { AuthenticationService } from './autenticacao.service';
import { AuthenticationController } from './autenticacao.controller';
import { UserModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'SEGREDO_SECRETO',
      signOptions: { expiresIn: '72h'},
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AutenticacaoModule {}
