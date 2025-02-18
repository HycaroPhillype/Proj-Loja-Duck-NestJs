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
    const produtoEntity: ProductEntity = new ProductEntity();

    Object.assign(produtoEntity, dadosProduto as ProductEntity)
    return this.productRepository.save(produtoEntity);
  }
  // async createProduct(productEntity: ProductEntity) {
  //   await this.productRepository.save(productEntity);
  // }

  async listAll() {
    return this.productRepository.find();
  }

  async updateProduct(id: string, dadosProduto: Partial<ProductEntity>) {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException('Produto não encontrado');
    const newProduct = {
      ...product,
      ...dadosProduto,
    };
    return this.productRepository.update(id, newProduct);
  }

  async deleteProduct(id: string) {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('O Produto não foi encontrado!');
    }
  }
}
