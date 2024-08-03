import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: String, required: [true, 'the product must have a title'] })
  title: string;

  @Prop({
    type: String,
    required: [true, 'the product must have description'],
  })
  description: string;

  @Prop({
    type: [String],
    required: [true, 'the product must have a image'],
  })
  images: string[];

  @Prop({
    type: Number,
    required: [true, 'the product must have price'],
  })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
