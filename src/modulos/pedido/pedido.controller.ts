import { Controller, Get, Post, Body, Query, Patch, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './pedido.service';
import { CreateOrderDto } from './dto/CriaPedido.dto';
import { UpdateOrderDto } from './dto/UpdateOrder.dto';
import { AuthenticationGuard } from '../autenticacao/autenticacao.guard';

@Controller('pedido')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthenticationGuard)
  async createOrder(
    @Query('userId') userId: string,
    @Body() dataOrder: CreateOrderDto,
  ) {
    const orderCreate = await this.orderService.registerOrder(userId, dataOrder);

   return {
    orderCreate,
    message: 'Pedido realizado com sucesso!'
  }
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

  @Patch(':id')
  updateOrder(
    @Param('id') orderId: string,
    @Body() dataUpdate: UpdateOrderDto) {
    return this.orderService.updateOrder(orderId, dataUpdate)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
