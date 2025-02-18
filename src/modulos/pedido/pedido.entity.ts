import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status.pedido.enum';
import { ItemOrderEntity } from './intempedido.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  splice(index: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "valor_total", nullable: false })
  valorTotal: number;

  @Column({ name: "status", enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_at' })
  cratedAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @ManyToOne(() => UserEntity, (user) => user.pedidos)
  user: UserEntity

  @OneToMany(() => ItemOrderEntity, (itemsOrder) => itemsOrder.order, {
    cascade:true
  })
  itemsOrder: ItemOrderEntity[]
};
