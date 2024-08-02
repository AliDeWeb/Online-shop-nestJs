import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly ProductsRepository: ProductsRepository) {}

  async createProduct(productData: CreateProductDto) {
    const newProduct = await this.ProductsRepository.createProduct(productData);

    return newProduct;
  }
}
