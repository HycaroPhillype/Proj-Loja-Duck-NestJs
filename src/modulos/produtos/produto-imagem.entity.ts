import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
    id?: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, { orphanedRowAction: 'delete', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  product: ProductEntity
}
