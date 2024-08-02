import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  @ApiResponse({
    status: 201,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  createUser(@Body() body: CreateUserDto) {
    return this.AuthService.createUser(body);
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'response contains a message and a token',
  })
  @ApiResponse({
    status: 400,
    description: 'response contains a error message',
  })
  @ApiResponse({
    status: 401,
    description: 'response contains a error message',
  })
  loginUser(@Body() body: LoginUserDto) {
    return this.AuthService.loginUser(body);
  }
}
