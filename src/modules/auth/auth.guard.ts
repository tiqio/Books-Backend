import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from './auth.jwt.secret';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('isPublic', isPublic);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET_KEY,
      });
      console.log('payload', payload);
      request['user'] = payload;
    } catch (e) {
      console.log('AuthGuard JWT_PARSE e', e);
      throw new UnauthorizedException();
    }

    return true;
  }
}

function extractTokenFromHeader(request) {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : '';
}
