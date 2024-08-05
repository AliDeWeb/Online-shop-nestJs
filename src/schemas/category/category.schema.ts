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
    unique: true,
  })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Indexes
CategorySchema.index({ title: 1 }, { unique: true });

// Virtual Properties
CategorySchema.set('toJSON', { virtuals: true });
CategorySchema.set('toObject', { virtuals: true });

CategorySchema.virtual('products', {
  ref: () => Product.name,
  localField: '_id',
  foreignField: 'category',
});
