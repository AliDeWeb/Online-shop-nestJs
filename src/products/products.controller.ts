import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/createProduct.dto';
import { ProtectedRouteGuard } from 'src/auth/guard/protectedRoute.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadProductImageMulterOptions } from 'src/helper/multerConfigs/uploadProductImage.config';
import { Schema } from 'mongoose';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Post('create-new-product')
  @UseInterceptors(FileInterceptor('image', uploadProductImageMulterOptions))
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
  createProduct(@Body() productData: CreateProductDto, @UploadedFile() file) {
    productData.image = `uploads/images/products/${file.filename}`;

    return this.productsService.createProduct(productData);
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete-product/:id')
  @HttpCode(200)
  @ApiParam({
    name: 'product id',
    required: true,
    description: 'this parameter must be a valid product id',
  })
  @ApiResponse({
    status: 200,
    description: 'response contains a success message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 403,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 500,
    description: 'this error will happen if id is not valid',
  })
  @ApiHeader({
    name: 'authorization',
    example: 'Bearer {{Token Here}}',
    description: 'authorization must be like `Bearer {{Token Here}}`',
    required: true,
  })
  async deleteProduct(@Param('id') id: Schema.Types.ObjectId) {
    await this.productsService.deleteProduct(id);

    return 'product deleted successfully';
  }
}
