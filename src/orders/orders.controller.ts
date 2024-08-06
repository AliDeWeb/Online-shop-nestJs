import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dtos/createOrder.dto';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(ProtectedRouteGuard)
  @Post('create')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'contains a message' })
  @ApiResponse({ status: 400, description: 'contains a error message' })
  @ApiResponse({ status: 403, description: 'contains a error message' })
  async createOrder(@Request() req, @Body() orderData: CreateOrdersDto) {
    await this.ordersService.createOrder(orderData, req.user.id);

    return 'the order has been registered';
  }
}
