import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Order, OrderDocument } from 'src/schemas/order/order.schema';
import { CreateOrdersDto } from './dtos/createOrder.dto';
import ApiFeatures from 'src/utilities/apis/apiFeatures';
import { orderStatus } from 'src/utilities/types/orderStatus.type';

export class OrdersRepository {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(orderData: CreateOrdersDto) {
    const newOrder = await this.orderModel.create(orderData);

    return newOrder;
  }

  async getAllOrders(queryObj: any) {
    const query = new ApiFeatures(this.orderModel.find(), queryObj)
      .filter()
      .sort()
      .fields()
      .paginate()
      .getQuery();

    return query;
  }

  async updateOrderStatus(id: Schema.Types.ObjectId, status: orderStatus) {
    return await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}
