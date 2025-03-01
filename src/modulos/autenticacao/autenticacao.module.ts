import { Module } from '@nestjs/common';
import { AuthenticationService } from './autenticacao.service';
import { AuthenticationController } from './autenticacao.controller';
import { UserModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return{
          secret: configService.get<string>('SEGREDO_JWT'),
          signOptions: { expiresIn: '72h'},
        }
      },
      inject: [ConfigService],
      global: true,
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AutenticacaoModule {}
