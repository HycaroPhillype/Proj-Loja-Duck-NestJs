import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './usuario.controller';
import { EmailUnicoValidator } from './validacao/email-unico-validator';
import { UserService } from './usuario.service';
import { UserEntity } from './usuario.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, EmailUnicoValidator],
  exports: [UserService]
})
export class UserModule {}
