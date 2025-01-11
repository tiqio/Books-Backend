import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: any) {
    console.log('typeof(id)', typeof id);
    return this.userService.findOne(id);
    // throw new HttpException('测试错误，id ' + id, HttpStatus.BAD_REQUEST);
  }
}
