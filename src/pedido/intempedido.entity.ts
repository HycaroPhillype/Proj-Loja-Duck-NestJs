import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm';
import { PedidoEntity } from './pedido.entity';

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

  @ManyToOne(() => PedidoEntity, (order) => order.itemsOrder, {
    onDelete: 'CASCADE',
    onUpdate:'CASCADE',
  })
  order: PedidoEntity
}
