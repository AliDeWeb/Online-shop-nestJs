import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
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
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserDto } from './dtos/user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize/serialize.interceptors';

@ApiTags('Users')
@ApiBearerAuth()
@UseInterceptors(new SerializeInterceptor(UserDto))
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @UseGuards(ProtectedRouteGuard)
  @Get('me')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
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
  async getMe(@Request() request) {
    const user = await this.UsersService.findUserById(request.user.id);

    return user;
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Get('get-user-by-phone-number/:phoneNumber')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
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
    name: 'phoneNumber',
    required: true,
    description: 'this parameter must be a valid phone number',
  })
  async getUserByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const user = await this.UsersService.findUserByPhoneNumber(phoneNumber);

    return user;
  }

  @UseGuards(ProtectedRouteGuard, RolesGuard)
  @Roles('admin')
  @Get('get-user-by-email/:email')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains user data witch are not sensitive',
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
    name: 'email',
    required: true,
    description: 'this parameter must be a valid email',
  })
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.UsersService.findUserByEmail(email);

    return user;
  }

  @UseGuards(ProtectedRouteGuard)
  @Patch('me')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains user data witch are not sensitive',
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
  async updateMe(@Body() UpdateUserData: UpdateUserDto, @Request() request) {
    const user = await this.UsersService.updateMe(
      request.user.id,
      UpdateUserData,
    );

    return user;
  }
}
