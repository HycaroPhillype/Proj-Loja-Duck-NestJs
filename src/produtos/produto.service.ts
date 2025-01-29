import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async createProduct(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProductEntity();

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.userId = dadosProduto.usuarioId;
    produtoEntity.valor = dadosProduto.valor;
    produtoEntity.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    produtoEntity.descricao = dadosProduto.descricao;
    produtoEntity.categoria = dadosProduto.categoria;
    produtoEntity.caracter = dadosProduto.caracter;
    produtoEntity.images = dadosProduto.images;

    return this.productRepository.save(produtoEntity);
  }
  // async createProduct(productEntity: ProductEntity) {
  //   await this.productRepository.save(productEntity);
  // }
}
