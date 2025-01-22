import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, } from 'typeorm';
import { ProductCaracteristica } from './produto-caracteristica.entity';
import { ProductImage } from './produto-imagem.entity';






@Entity({name: 'produtos' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'usuario_id', length: 100, nullable: false})
  userId: string;

  @Column({name: 'nome', length: 100, nullable: false})
  nome: string;

  @Column({name: 'valor', nullable: false})
  valor: number;

  @Column({name: 'quantidade', nullable: false})
  quantidade: number;

  @Column({name: 'descricao', length: 255, nullable: false})
  descricao: string;

  @Column({name: 'categoria', length: 100, nullable: false})
  categoria: string;

  @CreateDateColumn({ name: 'created_at' })
    cratedAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: string;

  caracteristicas: ProductCaracteristica[];
  imagens: ProductImage[];
}
