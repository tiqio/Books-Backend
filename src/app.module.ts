import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestService } from './test.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookModule } from './modules/book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// TypeORM也以Module的形式被使用
@Module({
  // 完成模块接口的开发后需要在这里进行注册
  imports: [
    UserModule,
    AuthModule,
    BookModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'deplus',
      database: 'vbenbook',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
