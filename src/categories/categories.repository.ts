import { Model, Schema } from 'mongoose';
import {
  Category,
  CategoryDocument,
} from '../schemas/category/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCategoryDto } from './dtos/createCategory.dto';

export class categoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly CategoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(categoryData: CreateCategoryDto) {
    return await this.CategoryModel.create(categoryData);
  }

  async deleteCategory(categoryId: Schema.Types.ObjectId) {
    return await this.CategoryModel.findByIdAndDelete(categoryId).exec();
  }

  async findAllCategories() {
    return await this.CategoryModel.find().populate('products').select('-__v');
  }

  async findCategoryById(id: Schema.Types.ObjectId) {
    return await this.CategoryModel.findById(id)
      .populate('products')
      .select('-__v');
  }
}
