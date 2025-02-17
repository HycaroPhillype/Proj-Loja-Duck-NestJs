import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';


import { ProductEntity } from './produto.entity';
import { UpdateProductDTO} from './dto/AtualizaProduto.dto';
import { CaracteristicaProdutoDTO, CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProductService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(
    private readonly produtoService: ProductService
  ) {}

  @Post()
  async createNew(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = await this.produtoService.createProduct(
      dadosProduto,
    );

    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    }
  }
    // const product = new ProductEntity();

    // product.id = randomUUID();
    // product.nome = dadosProduto.nome;
    // product.valor = dadosProduto.valor;
    // product.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
    // product.descricao = dadosProduto.descricao;
    // product.categoria = dadosProduto.categoria;
    // product.caracter = dadosProduto.caracter;
    // product.images = dadosProduto.images;

    // const produtoCadastrado = this.produtoService.createProduct(product);
    // return produtoCadastrado;


  @Get()
  async AllList() {
    return this.produtoService.listAll();
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() dadosProduto: UpdateProductDTO,
  ) {
    const productChanged = await this.produtoService.updateProduct(
      id,
      dadosProduto as unknown as Partial<ProductEntity>,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: productChanged,
    };
  }

  @Delete('/id')
  async delete(
    @Param('id') id: string
  ) {
    const deleteProduct = await this.produtoService.deleteProduct(id)
    return {
      product: deleteProduct,
      messege: 'Produto removido com sucesso.'
    }
  }
}
