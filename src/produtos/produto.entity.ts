import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductCaracterEntity } from './produto-caracteristica.entity';
import { ProductImageEntity } from './produto-imagem.entity';

@Entity({ name: 'produtos' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  userId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @OneToMany(() => ProductCaracterEntity,(productCaracterEntity) => productCaracterEntity.product, { cascade: true, eager: true})
  caracter: ProductCaracterEntity[];

  @OneToMany(() => ProductImageEntity,(productImageEntity) => productImageEntity.product, { cascade: true, eager: true})
  images: ProductImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  cratedAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
