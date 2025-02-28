import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status.pedido.enum';
import { CreateOrderDto } from './dto/CriaPedido.dto';
import { ItemOrderEntity } from './intempedido.entity';
import { ProductEntity } from '../produtos/produto.entity';
import { UpdateOrderDto } from './dto/UpdateOrder.dto';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly pedidoRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly orderRepository: Repository<ProductEntity>,
  ) {}

  private async searchUser(id) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('O usuário não foi encontrado');
    }

    return user;
  }

  private treatDataOrder(
    dataOrder: CreateOrderDto,
    productsRelateds: ProductEntity[],
  ) {
    dataOrder.itemsOrder.forEach((itemOrder) => {
      const productRelated = productsRelateds.find(
        (product) => product.id === itemOrder.productId,
      );

      if (!productRelated)
        throw new NotFoundException(
          `O Produto com id ${itemOrder.productId} não foi encontrado.`,
        );

      if (itemOrder.quantidade > productRelated.quantidadeDisponivel) {
        throw new BadRequestException(
          `A quantidade splicitada (${itemOrder.quantidade}) é maior do que a disponivel (${productRelated.quantidadeDisponivel}) para o (${productRelated.nome})`,
        );
      }
    });
  }

  async registerOrder(userId: string, dataOrder: CreateOrderDto) {

    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('Usuario não encontrado');
    }
    console.log('dataOrder recebido', dataOrder);
    console.log('itemsOrder:', dataOrder?.itemsOrder);

    const productsIds = dataOrder?.itemsOrder?.map(
      (itemOrder) => itemOrder?.productId,
    );
    console.log( 'ids encontrados ', productsIds);


    const productsRelated = await this.orderRepository.findBy({
      id: In(productsIds),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = StatusPedido.EM_PROCESSAMENTO;
    orderEntity.user = user;

    this.treatDataOrder(dataOrder, productsRelated);

    const itemsOrderEntity = dataOrder.itemsOrder.map((itemOrder) => {
      const productRelated = productsRelated.find(
        (product) => product.id === itemOrder.productId,
      );

      const itemOrderEntity = new ItemOrderEntity();
      itemOrderEntity.product = productRelated!;
      itemOrderEntity.precoVenda = productRelated!.value;
      itemOrderEntity.quantidade = itemOrder.quantidade;
      itemOrderEntity.product.quantidadeDisponivel -= itemOrder.quantidade;
      return itemOrderEntity;
    });

    const valorTotal = itemsOrderEntity.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    orderEntity.itemsOrder = itemsOrderEntity;

    orderEntity.valorTotal = valorTotal;

    const orderCreate = await this.pedidoRepository.save(orderEntity);

    return orderCreate;
  }

  async getOrderUser(userId: string) {
    const user = await this.searchUser(userId);

    return this.pedidoRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
      },
    });
  }

  async updateOrder(id: string, dto: UpdateOrderDto) {
    const order = await this.pedidoRepository.findOneBy({ id });

    if (!order) {
      throw new NotFoundException('O Pedido não foi encontrado');
    }

    Object.assign(order, dto as OrderEntity);

    return this.pedidoRepository.save(order);
  }
}
