import { BadRequestException, Injectable } from '@nestjs/common';
import { categoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { Schema } from 'mongoose';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: categoryRepository) {}

  async createCategory(categoryData: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(categoryData);
  }

  async deleteCategory(categoryId: Schema.Types.ObjectId) {
    const deletedCategory =
      await this.categoryRepository.deleteCategory(categoryId);

    if (!deletedCategory)
      throw new BadRequestException('category is not found');

    return deletedCategory;
  }

  async findAllCategories() {
    const query = this.categoryRepository
      .findAllCategories()
      .populate('products');

    return await query.exec();
  }
}
