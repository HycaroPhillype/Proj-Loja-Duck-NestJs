import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProductEntity } from './produto.entity';
import { UpdateProductDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProductService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CustomLogger } from '../../resources/interceptores/custom-logger.service';

@Controller('produtos')
export class ProductController {
  constructor(
    private readonly produtoService: ProductService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('ProdutoController')
  }

  @Post()
  async createNew(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado =
      await this.produtoService.createProduct(dadosProduto);

    return {
      mensagem: 'Produto criado com sucesso.',
      produto: produtoCadastrado,
    };
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
  @UseInterceptors(CacheInterceptor)
  async AllList() {
    return this.produtoService.listAll();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor) /// Utlizando cache e redis do Nest
  async listById(@Param('id') id: string) {
    const productSave = await this.produtoService.listById(id);
    console.log("Produto sendo buscado no BD")
    return productSave
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
  async delete(@Param('id') id: string) {
    const deleteProduct = await this.produtoService.deleteProduct(id);
    return { product: deleteProduct, messege: 'Produto removido com sucesso.' };
  }
}
