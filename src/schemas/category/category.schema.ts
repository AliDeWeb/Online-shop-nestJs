import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../product/product.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({
    type: String,
    required: [true, 'provide a title for category'],
  })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Virtual Properties
CategorySchema.virtual('products', {
  ref: Product.name,
  localField: '_id',
  foreignField: 'category',
});
