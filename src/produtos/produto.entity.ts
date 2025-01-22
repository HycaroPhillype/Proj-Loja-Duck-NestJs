import { Entity, Column, PrimaryGeneratedColumn, } from 'typeorm';



// class CaracteristicaProduct {
//   nome: string;
//   descricao: string;
// }

// class ImagemProduct {
//   url: string;
//   descricao: string;
// }


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

  // caracteristicas: CaracteristicaProduct[];
  // imagens: ImagemProduct[];
}
