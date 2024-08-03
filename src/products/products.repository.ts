import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product/product.schema';
import { CreateProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async createProduct(productData: CreateProductDto): Promise<Product> {
    return await this.productModel.create(productData);
  }

  async findProductById(id: Schema.Types.ObjectId): Promise<Product | null> {
    return await this.productModel.findById(id);
  }

  async deleteProduct(id: Schema.Types.ObjectId): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
