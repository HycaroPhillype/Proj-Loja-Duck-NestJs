import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './produto.entity';

let product: ProductEntity[] = [];
@Injectable()
export class ProdutoRepository {

  listAll() {
    return product;
  }

  salva(dadosProduto: ProductEntity) {
    product.push(dadosProduto);
    return dadosProduto;
  }

  private buscaPorId(id: string) {
    const possivelProduto = product.find((produto) => produto.id === id);

    if (!possivelProduto) {
      throw new NotFoundException('Produto não existe');
    }

    return possivelProduto;
  }

  async updateProduct(id: string, dadosProduto: Partial<ProductEntity>) {
    const dadosNaoAtualizaveis = ['id', 'usuarioId'];
    const produto = this.buscaPorId(id);



    Object.entries(dadosProduto).forEach(([chave, valor]) => {

      if (dadosNaoAtualizaveis.includes(chave)) {
        return;
      }
      produto[chave] = valor;
    });

    return produto;
  }

  async remove(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    product = product.filter((produto) => produto.id !== id);
    return produtoRemovido;
  }
}
