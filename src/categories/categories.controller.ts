import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';
import { ProtectedRouteGuard } from '../auth/guard/protectedRoute.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Schema } from 'mongoose';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('all')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains all categories data',
  })
  async getAllCategories() {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains category data',
  })
  @ApiResponse({
    status: 400,
    description: 'invalid category Id',
  })
  async getCategory(@Param('id') id: Schema.Types.ObjectId) {
    return this.categoriesService.findCategoryById(id);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Post('create')
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    const newCategory =
      await this.categoriesService.createCategory(categoryData);

    return `category ${newCategory.title} was created successfully`;
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete/:id')
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  @ApiParam({
    name: 'category id',
    description: 'this must be a valid category id',
  })
  async deleteCategory(@Param('id') id: Schema.Types.ObjectId) {
    await this.categoriesService.deleteCategory(id);

    return 'category deleted successfully';
  }
}
