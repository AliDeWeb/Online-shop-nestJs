import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.AuthService.createUser(body);
  }

  @Post('login')
  loginUser(@Body() body: LoginUserDto) {
    return this.AuthService.loginUser(body);
  }
}
