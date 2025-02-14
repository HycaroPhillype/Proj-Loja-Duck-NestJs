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

  async createUser(dadosUsuario: CriaUsuarioDTO) {
    const userEntity = this.userRepository.create(dadosUsuario);
    return this.userRepository.save(userEntity)
  }

  // async createUser(dadosUsuario: CriaUsuarioDTO)  {
  //   const userEntity = new UserEntity;

  //   userEntity.email = dadosUsuario.email;
  //   userEntity.senha = dadosUsuario.senha;
  //   userEntity.nome = dadosUsuario.nome;

  //   return this.userRepository.save(userEntity)
  // }

  async updateUser(id: string, userEntity: UpdateUserDTO) {
    await this.userRepository.update(id, userEntity);
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }
}

