import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product/product.schema';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

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
    return await this.productModel.findById(id).populate('category').exec();
  }

  async updateProduct(
    id: Schema.Types.ObjectId,
    productData: UpdateProductDto,
  ): Promise<Product | null> {
    return await this.productModel
      .findByIdAndUpdate(id, productData, { new: true })
      .exec();
  }

  async deleteProduct(id: Schema.Types.ObjectId): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id).exec();
  }
}
