import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status.pedido.enum';
import { CreateOrderDto } from './dto/CriaPedido.dto';
import { ItemOrderEntity } from './intempedido.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedindoRepository: Repository<PedidoEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerOrder(userId: string, dataOrder: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const orderEntity = new PedidoEntity();

    orderEntity.status = StatusPedido.EM_PROCESSAMENTO;
    orderEntity.user = user;

    const itemsOrderEntity = dataOrder.itemsOrder.map((intemOrder) => {
      const itemOrderEntity = new ItemOrderEntity();

      itemOrderEntity.precoVenda = 10;
      itemOrderEntity.quantidade = intemOrder.quantidade;
      return itemOrderEntity
    })

    const valorTotal = itemsOrderEntity.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade
    }, 0);

    orderEntity.itemsOrder = itemsOrderEntity

    orderEntity.valorTotal = valorTotal

    const orderCreate = await this.pedindoRepository.save(orderEntity);

    return orderCreate;
  }

  async getOrderUser(userId: string) {
    return this.pedindoRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
  }
}
