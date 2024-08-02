import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProtectedRouteGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer'))
      throw new ForbiddenException('invalid token');

    const token = authorization?.split(' ')[1];

    if (!token) throw new ForbiddenException('invalid token');

    try {
      const payload = await this.JwtService.verifyAsync(token);

      req.user = payload;

      return true;
    } catch (err) {}
    throw new ForbiddenException('invalid token');
  }
}
