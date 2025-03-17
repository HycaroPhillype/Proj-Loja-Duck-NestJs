import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { CustomLogger } from '../../resources/interceptores/custom-logger.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly logger: CustomLogger,
  ) {}

  async createProduct(dadosProduto: CriaProdutoDTO) {
    const produtoEntity: ProductEntity = new ProductEntity();
    // const {caracter, images, ...rest} = dadosProduto

    Object.assign(produtoEntity, dadosProduto as ProductEntity)
    const productSave = await this.productRepository.save(produtoEntity);
    const productRegistered = await this.productRepository.save(produtoEntity);



    this.logger.logInFile(productRegistered)
    this.logger.logColor(productSave.nome, productSave.quantidadeDisponivel, productSave.value)

    return productSave;
  }

  async listAll() {
    return this.productRepository.find();
  }

  async listById(id: string) {
    return this.productRepository.findOne({ //Se precisa trazer relações (@OneToMany, @ManyToOne): Use findOne() com relations.
      where: { id },
      relations: ['caracter']
    })
    // return this.productRepository.findOneBy({ id })   //Se só precisa do produto pelo ID: Use findOneBy().
  }

  async updateProduct(id: string, dadosProduto: Partial<ProductEntity>) {
    const product = await this.productRepository.findOneBy({ id });

    // const { caracter, images, ...rest } = dadosProduto

    if (!product) throw new NotFoundException('Produto não encontrado');
    const newProduct = {
      ...product,
      ...dadosProduto,
    };

    const productUpdate = await this.productRepository.save(newProduct);

    this.logger.logColor(productUpdate.nome, productUpdate.quantidadeDisponivel, productUpdate.value)
  }

  async deleteProduct(id: string) {
    const result = await this.productRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException('O Produto não foi encontrado!');
    }

    this.logger.log(`Produto com ID ${id} foi deletado.`)
  }
}
