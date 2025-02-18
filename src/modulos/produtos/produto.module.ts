import { Module } from '@nestjs/common';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './produto.entity';
import { ProductService } from './produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProdutoController],
  providers: [ProductService],
})
export class ProdutoModule {}
