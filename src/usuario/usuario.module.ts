import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioRepository } from './usuario.repository';
import { EmailUnicoValidator } from './validacao/email-unico-validator';
import { UserService } from './usuario.service';
import { UserEntity } from './usuario.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsuarioController],
  providers: [UserService, UsuarioRepository, EmailUnicoValidator],
})
export class UsuarioModule {}
