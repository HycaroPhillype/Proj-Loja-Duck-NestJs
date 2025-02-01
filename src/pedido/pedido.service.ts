import { Injectable, Query } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status.pedido.enum';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedindoRepository: Repository<PedidoEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async registerOrder(userId: string) {
    const user = await this.userRepository.findOneBy({id: userId})
    const orderEntity = new PedidoEntity();

    orderEntity.valorTotal = 0;
    orderEntity.status = StatusPedido.EM_PROCESSAMENTO;
    orderEntity.user = user

    const orderCreate = await this.pedindoRepository.save(orderEntity)

    return orderCreate
  }

  async getOrderUser(userId: string) {
    return this.pedindoRepository.find({
      where: {
        user: { id: userId}
      },
      relations: {
        user: true
      }
    })
  }
}
