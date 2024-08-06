import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { User } from '../user/user.schema';
import { Product } from '../product/product.schema';

export type OrderDocument = HydratedDocument<Order>;

class OrderProduct {
  @Prop({ type: Number })
  count: number;

  @Prop({ type: mongooseSchema.Types.ObjectId, ref: Product.name })
  product: mongooseSchema.Types.ObjectId;
}

@Schema()
export class Order {
  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: User.name,
    required: [true, 'user is required'],
  })
  user: mongooseSchema.Types.ObjectId;

  @Prop({ type: String, required: [true, 'address is required'] })
  address: string;

  @Prop({ type: String, default: 'review' })
  status: string;

  @Prop({
    required: [true, 'products is required'],
    type: [OrderProduct],
    ref: Product.name,
  })
  products: OrderProduct[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
