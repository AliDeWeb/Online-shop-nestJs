import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return await this.categoryRepository.findAllCategories();
  }

  async findCategoryById(id: Schema.Types.ObjectId) {
    const category = await this.categoryRepository.findCategoryById(id);

    if (!category) throw new NotFoundException('the category is not found');

    return category;
  }
}
