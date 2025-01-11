import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe, Post,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { UserService } from './user.service';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log('typeof(id)', typeof id);
    return this.userService.findOne(id);
    // throw new HttpException('测试错误，id ' + id, HttpStatus.BAD_REQUEST);
  }

  @Get()
  getAllUser() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
