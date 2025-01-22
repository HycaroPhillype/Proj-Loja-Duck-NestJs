import { Entity, Column } from 'typeorm';

@Entity('produto_caracteristicas')
export class ProductCaracteristica {
  @Column({ name: 'nome', length: 100, nullable: false})
  nome: string;

  @Column({ name: 'descricao', length: 255, nullable: false})
  descricao: string;
}
