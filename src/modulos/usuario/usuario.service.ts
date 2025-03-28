import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListUserDTO } from './dto/Listausuario.dto';
import { UserEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/UpdateUsers.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario-dto';

@Injectable()
export class UserService {
  id: string;
  nome: string;
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async createUser(dadosUsuario: CriaUsuarioDTO)  {
    const userEntity = new UserEntity();

    Object.assign(userEntity, dadosUsuario as UserEntity)

    return this.userRepository.save(userEntity)
  }

  async listUsers() {
    const usersSave = await this.userRepository.find();
    const usersList = usersSave.map(
      (user) => new ListUserDTO(user.id, user.nome)
    )
    return usersList;
  }

  async listUser(id: string) {
    const user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new Error('Usuário não encontrado')
    }
      return new ListUserDTO(user.id, user.nome)
  }

  async searchByEmail(email: string ) {
    const checkEmail = await this.userRepository.findOne({
      where: { email },
    })

    if (!checkEmail) throw new NotFoundException('O email não foi encontrado')
    return checkEmail;
  }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    const user =  await this.userRepository.findOneBy({id})

    if (!user) throw new NotFoundException('Usuario não encontrado');

    const newUser = {
      ...user,
      ...userEntity
    }

    return this.userRepository.update(id, newUser);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}

