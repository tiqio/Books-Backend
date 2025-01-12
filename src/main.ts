import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 如果使用域名需要配置跨域允许
  const app = await NestFactory.create(AppModule, { cors: true });
  // const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
