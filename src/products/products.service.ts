import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProductsRepository } from './products.repository';
import { Schema } from 'mongoose';
import { deleteFile } from 'src/utilities/funcs/delete-file';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly ProductsRepository: ProductsRepository) {}

  async createProduct(productData: CreateProductDto) {
    const newProduct = await this.ProductsRepository.createProduct(productData);

    return newProduct;
  }

  async deleteProduct(id: Schema.Types.ObjectId) {
    const product = await this.ProductsRepository.findProductById(id);

    if (!product) throw new NotFoundException('product is not found');

    const productImagesPath = product.images;

    const result = await this.ProductsRepository.deleteProduct(id);

    if (!result) throw new BadRequestException('product does not exist');

    productImagesPath.forEach(async (el) => {
      await deleteFile(`static/${el}`);
    });

    return result;
  }

  async findProductById(id: Schema.Types.ObjectId) {
    const product = await this.ProductsRepository.findProductById(id);

    if (!product) throw new NotFoundException('the product is not found');

    return product;
  }

  async updateProduct(
    id: Schema.Types.ObjectId,
    productData: UpdateProductDto,
  ) {
    const prevProductData = await this.ProductsRepository.findProductById(id);

    if (!prevProductData) throw new NotFoundException('product is not found');

    const productImagesPath = prevProductData.images;

    const product = await this.ProductsRepository.updateProduct(
      id,
      productData,
    );

    if (!product) throw new NotFoundException('the product is not found');

    productImagesPath.forEach(async (el) => {
      await deleteFile(`static/${el}`);
    });

    return product;
  }
}
