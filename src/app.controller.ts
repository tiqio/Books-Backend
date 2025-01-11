import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

@Controller()
export class AppController {
  // 使用时无需定义结构体字段
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  // 什么都不写就是一个'/'
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return 'test';
  }

  @Get('/data/:subId')
  @UseFilters(new HttpExceptionFilter()) // 自定义报错格式
  getData(@Param() params): string {
    return this.testService.getData(params);
  }
}
