import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { PedidoEntity } from '../pedido/pedido.entity';

@Entity({ name: 'usuarios' })
export class UserEntity {
  splice(index: number, arg1: number) {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  nome: string;

  @Column({ length: 70, nullable: false })
  email: string;

  @Column({ length: 255, nullable: true })
  endereco: string;

  @Column({ length: 255, nullable: false })
  senha: string;

  @CreateDateColumn({ name: 'created_at' })
  cratedAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;

  @OneToMany(() => PedidoEntity, (pedido) => pedido.user)
  pedidos: PedidoEntity[];
}
