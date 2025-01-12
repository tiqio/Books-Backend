import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../../exception/http-exception.filter';
import { UserService } from './user.service';
import { wrapperResponse } from '../../utils';

@Controller('user')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  // info需要在:id前面
  @Get('info')
  getUserByToken(@Req() request) {
    // 通过AuthGuard解析Token获得的User信息查询用户
    // return this.userService.findByUsername(request.user.username);
    return wrapperResponse(
      this.userService.findByUsername(request.user.username),
      '获取用户信息成功',
    );
  }

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
