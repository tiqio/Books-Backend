import { Controller, Get } from '@nestjs/common';

@Controller('book')
export class BookController {
  @Get(`test`)
  getStr() {
    return 'test str';
  }
}
