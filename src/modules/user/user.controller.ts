import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: any) {
    console.log('typeof(id)', typeof id);
    throw new HttpException('测试错误，id ' + id, HttpStatus.BAD_REQUEST);
  }
}
