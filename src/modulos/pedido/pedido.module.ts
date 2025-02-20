import { Module } from '@nestjs/common';
import { OrderService } from './pedido.service';
import { OrderController,  } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { ProductEntity } from '../produtos/produto.entity';
import { OrderEntity } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

