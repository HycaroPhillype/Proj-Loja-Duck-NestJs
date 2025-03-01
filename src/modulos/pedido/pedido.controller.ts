import { Controller, Get, Post, Body, Query, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './pedido.service';
import { CreateOrderDto } from './dto/CriaPedido.dto';
import { UpdateOrderDto } from './dto/UpdateOrder.dto';
import { AuthenticationGuard, RequestWithUser } from '../autenticacao/autenticacao.guard';

@UseGuards(AuthenticationGuard)
@Controller('pedido')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Req() req: RequestWithUser,
    @Body() dataOrder: CreateOrderDto,
  ) {
    const userId = req.user.sub;
    const orderCreate = await this.orderService.registerOrder(userId, dataOrder);

   return orderCreate

  }

  @Get()
  async getOrderUser(@Req() req: RequestWithUser) {
    const userId = req.user.sub
    const order = await this.orderService.getOrderUser(userId);

    return {
      message: 'Pedido obetidos com sucesso.',
      order,
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.pedidoService.findOne(+id);
  // }

  @Patch(':id')
  async updateOrder(
    @Req() req: RequestWithUser,
    @Param('id') orderId: string,
    @Body() dataUpdate: UpdateOrderDto) {
    const userId = req.user.sub
    const orderUpdate = await this.orderService.updateOrder(
      orderId,
      dataUpdate,
      userId,
    )
    return orderUpdate
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pedidoService.remove(+id);
  // }
}
