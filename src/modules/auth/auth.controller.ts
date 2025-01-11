import { Controller, Get, Post } from '@nestjs/common';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  @Get('test')
  testStr() {
    return 'test';
  }

  @Public()
  @Post('login')
  login() {
    return 'auth';
  }
}
