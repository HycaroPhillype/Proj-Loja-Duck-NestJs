import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UserEntity } from '../usuario/usuario.entity';
import { ProductEntity } from '../produtos/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UserEntity, ProductEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
