import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig,  } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';
import * as crypto from 'crypto';
import { ProdutoModule } from './produtos/produto.module';

(global as any).crypto = crypto;
@Module({
  imports: [
    UsuarioModule, ProdutoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...postgresConfig,
        autoLoadEntities: true,
      }),
    }),
    PedidoModule,
  ],
})
export class AppModule {}
