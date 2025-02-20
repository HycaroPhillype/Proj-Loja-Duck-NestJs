import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { OrderEntity } from './pedido.entity';
import { ProductEntity } from '../produtos/produto.entity';

@Entity({ name: 'intens_pedidos' })
export class ItemOrderEntity {
  splice(index: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  quantidade: number;

  @Column({ name: "preco_venda", nullable: false })
  precoVenda: number;

  @ManyToOne(() => OrderEntity, (order) => order.itemsOrder, {
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
  })
  order: OrderEntity

  @ManyToOne(() => ProductEntity, (product) => product.itemsOrder, {
    cascade: ['update']
  })

  product: ProductEntity
}
