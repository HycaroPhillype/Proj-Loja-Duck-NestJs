import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import * as crypto from 'crypto';
import { APP_FILTER } from '@nestjs/core';
import { FilterExceptionGlobal } from './resources/filter/filter-exception-global';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { ProdutoModule } from './modulos/produtos/produto.module';

(global as any).crypto = crypto;
@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
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
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionGlobal,
    },
  ],
})
export class AppModule {}
