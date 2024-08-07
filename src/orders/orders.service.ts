import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersDto } from './dtos/createOrder.dto';
import { Schema } from 'mongoose';
import {
  orderStatus,
  orderStatusEnum,
} from 'src/utilities/types/orderStatus.type';

@Injectable()
export class OrdersService {
  constructor(private readonly OrdersRepository: OrdersRepository) {}

  async createOrder(orderData: CreateOrdersDto, userId: Schema.Types.ObjectId) {
    orderData.user = userId;

    if (!orderData?.products?.length) {
      throw new BadRequestException(
        'ordered products must have 1 product at least',
      );
    }

    const newProduct = await this.OrdersRepository.createOrder(orderData);

    return newProduct;
  }

  async getAllOrders(queryObj: any) {
    const orders = await this.OrdersRepository.getAllOrders(queryObj);

    return orders;
  }

  async updateOrderStatus(id: Schema.Types.ObjectId, status: orderStatus) {
    if (!orderStatusEnum.includes(status))
      throw new BadRequestException(
        `${status} is not allowed as a product status`,
      );

    const newOrderInfo = await this.OrdersRepository.updateOrderStatus(
      id,
      status,
    );

    if (!newOrderInfo) throw new BadRequestException('Order is not found');

    return newOrderInfo;
  }

  async getOrderInfo(id: Schema.Types.ObjectId) {
    const order = await this.OrdersRepository.getOrderInfo(id);

    if (!order) throw new BadRequestException('Order is not found');

    return order;
  }
}
