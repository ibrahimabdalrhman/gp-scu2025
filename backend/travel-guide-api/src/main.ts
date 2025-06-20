import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { json, raw, urlencoded } from 'express';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/webhook/success', raw({ type: 'application/json' }));

  app.use(json());
  app.use(urlencoded({ extended: true }));
  
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
