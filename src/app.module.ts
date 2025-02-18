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
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

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
    CacheModule.register({isGlobal: true, ttl: 10000}), // esse "ttl" se caso eu fiz um Get, antes de dez segundo vou pegar as mesmas informações, so que do cach, da memoria. depois dos 10 segundo, vai ser novamente um get do BD.
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionGlobal,
    },
  ],
})
export class AppModule {}
