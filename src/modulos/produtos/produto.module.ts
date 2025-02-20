import { Module } from '@nestjs/common';
import { ProductController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './produto.entity';
import { ProductService } from './produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
