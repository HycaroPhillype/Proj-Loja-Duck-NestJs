import { Module } from '@nestjs/common';
import { ProductController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './produto.entity';
import { ProductService } from './produto.service';
import { CustomLoggerModule } from '../../resources/interceptores/logger.module';
import { CustomLogger } from '../../resources/interceptores/custom-logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]),
  CustomLoggerModule
],
  controllers: [ProductController],
  providers: [ProductService, CustomLogger],
  exports: [ProductService],
})
export class ProductModule {}
