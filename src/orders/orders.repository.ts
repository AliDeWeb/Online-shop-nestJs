import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/schemas/order/order.schema';
import { CreateOrdersDto } from './dtos/createOrder.dto';

export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(orderData: CreateOrdersDto) {
    const newOrder = await this.orderModel.create(orderData);

    return newOrder;
  }
}
