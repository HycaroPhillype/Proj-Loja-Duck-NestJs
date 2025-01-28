import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { ProductEntity } from './produto.entity';

@Entity('produto_caracteristicas')
export class ProductCaracterEntity {
  @PrimaryGeneratedColumn('uuid')
    id?: string;

  @Column({ name: 'nome', length: 100, nullable: false})
  nome: string;

  @Column({ name: 'descricao', length: 255, nullable: false})
  descricao: string;

  @ManyToOne(() => ProductEntity, (product) => product.caracter)
  product: ProductEntity
}
