import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { Public } from './public.decorator';
import { AuthService } from './auth.service';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { error, success, wrapperResponse } from '../../utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test')
  testStr() {
    return 'test';
  }

  @Public()
  @Post('login')
  @UseFilters(new HttpExceptionFilter())
  async login(@Body() body) {
    // return await this.authService
    //   .login(body.username, body.password)
    //   .then((data) => success(data, '登录成功'))
    //   .catch((err) => error(err.message));
    return wrapperResponse(
      this.authService.login(body.username, body.password),
      '登录成功',
    );
  }
}
