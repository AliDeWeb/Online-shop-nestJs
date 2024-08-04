import { Injectable } from '@nestjs/common';
import { categoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoryRepository: categoryRepository) {}

  async createCategory(categoryData: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(categoryData);
  }
}
