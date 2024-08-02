import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
