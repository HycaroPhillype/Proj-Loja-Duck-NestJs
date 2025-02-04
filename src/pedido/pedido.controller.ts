import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreateOrderDto } from './dto/CriaPedido.dto';

@Controller('pedido')
export class PedidoController {
  constructor(private readonly orderService: PedidoService) {}

  @Post()
  async createOrder(
    @Query('userId') userId: string,
    @Body() dataOrder: CreateOrderDto,
  ) {
    const orderCreate = await this.orderService.registerOrder(userId, dataOrder);

   return orderCreate
  }


  @Get()
  async getOrderUser(@Query('userId') userId: string) {
    const order = await this.orderService.getOrderUser(userId);

    return order;
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pedidoService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
  //   return this.pedidoService.update(+id, updatePedidoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
