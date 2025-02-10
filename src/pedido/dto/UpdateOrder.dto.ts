import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './CriaPedido.dto';
import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/status.pedido.enum';

export class UpdateOrderDto {
  @IsEnum(StatusPedido)
  status: StatusPedido
}
