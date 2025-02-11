import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(dadosProduto: CriaProdutoDTO) {
    const produtoEntity = new ProductEntity();

    produtoEntity.nome = dadosProduto.nome;
    produtoEntity.value = dadosProduto.valor;
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

  async listAll() {
    return this.productRepository.find();
  }

  async updateProduct(id: string, dadosProduto: Partial<ProductEntity>) {
    const product = await this.productRepository.findOneBy({id});

    if(!product) throw new NotFoundException('Produto não encontrado')

    return product
  }
}
