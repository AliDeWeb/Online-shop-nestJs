import { BadRequestException, Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersDto } from './dtos/createOrder.dto';
import { Schema } from 'mongoose';

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
}
