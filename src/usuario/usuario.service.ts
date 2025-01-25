import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dto/Listausuario.dto';
import { UserEntity } from './usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async listUsers() {
    const usersSave = await this.userRepository.find();
    const usersList = usersSave.map(
      (user) => new ListUserDTO(user.id, user.nome)
    )
    return usersList;
  }
}
