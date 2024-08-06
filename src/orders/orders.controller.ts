import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrdersDto } from './dtos/createOrder.dto';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Schema } from 'mongoose';
import { UpdateOrderStatusDto } from './dtos/updateOrderStatus.dto';

@ApiTags('Orders')
@Controller('orders')
@ApiBearerAuth()
@ApiHeader({
  name: 'authorization',
  example: 'Bearer {{Token Here}}',
  description: 'authorization must be like `Bearer {{Token Here}}`',
  required: true,
})
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

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Get('get-all')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'contains a message' })
  @ApiResponse({ status: 400, description: 'contains a error message' })
  @ApiResponse({ status: 403, description: 'contains a error message' })
  async getAllOrders(@Query() query) {
    const orders = await this.ordersService.getAllOrders(query);

    return orders;
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Patch('status/:id')
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'contains a message' })
  @ApiResponse({ status: 400, description: 'contains a error message' })
  @ApiResponse({ status: 403, description: 'contains a error message' })
  @ApiParam({
    name: 'order id',
    description: 'this must be a valid order id',
  })
  async updateOrderStatus(
    @Param('id') id: Schema.Types.ObjectId,
    @Body() body: UpdateOrderStatusDto,
  ) {
    const orders = await this.ordersService.updateOrderStatus(id, body.status);

    return orders;
  }
}
