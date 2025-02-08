import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status.pedido.enum';
import { CreateOrderDto } from './dto/CriaPedido.dto';
import { ItemOrderEntity } from './intempedido.entity';
import { ProductEntity } from '../produtos/produto.entity';
@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedindoRepository: Repository<PedidoEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly orderRepository: Repository<ProductEntity>,
  ) {}

  async registerOrder(userId: string, dataOrder: CreateOrderDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const productsIds = dataOrder.itemsOrder.map(
      (itemOrder) => itemOrder.productId,
    );

    const productsRelated = await this.orderRepository.findBy({
      id: In(productsIds),
    });
    const orderEntity = new PedidoEntity();

    orderEntity.status = StatusPedido.EM_PROCESSAMENTO;
    orderEntity.user = user;

    const itemsOrderEntity = dataOrder.itemsOrder.map((itemOrder) => {
      const productRelated = productsRelated.find(
        (product) => product.id === itemOrder.productId,
      );
      const itemOrderEntity = new ItemOrderEntity();
      itemOrderEntity.product = productRelated;
      itemOrderEntity.precoVenda = productRelated.value
      itemOrderEntity.quantidade = itemOrder.quantidade;
      itemOrderEntity.product.quantidadeDisponivel -= itemOrder.quantidade
      return itemOrderEntity;
    });

    const valorTotal = itemsOrderEntity.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    orderEntity.itemsOrder = itemsOrderEntity;

    orderEntity.valorTotal = valorTotal;

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
