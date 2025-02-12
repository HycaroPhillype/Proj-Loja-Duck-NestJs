import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig,  } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './pedido/pedido.module';
import * as crypto from 'crypto';
import { ProdutoModule } from './produtos/produto.module';
import { APP_FILTER } from '@nestjs/core';
import { FilterExceptionHttp } from './filter/filter-exception-http';

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
  providers: [
    {
      provide: APP_FILTER,
      useClass: FilterExceptionHttp,
    }
  ]
})
export class AppModule {}
