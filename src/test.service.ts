import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getData(params): string {
    if (!params.subId || !Number.isInteger(+params.subId)) {
      throw new HttpException(
        '必须包含id参数，并且id为数字',
        HttpStatus.BAD_REQUEST,
      );
      // 默认报错结构
      // { "statusCode": 400, "message": "xxx }
    }
    return 'get data ' + params.subId;
  }
}
