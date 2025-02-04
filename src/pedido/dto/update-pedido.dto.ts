import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './CriaPedido.dto';

export class UpdatePedidoDto extends PartialType(CreateOrderDto) {}
