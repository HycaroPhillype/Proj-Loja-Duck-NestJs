import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../usuario/usuario.entity';
import { ProductEntity } from '../produtos/produto.entity';
import { PedidoEntity } from './pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UserEntity, ProductEntity])],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
