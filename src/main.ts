import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const serverConfig = config.get('server');
  console.log(serverConfig);
  

  const port = 3000;
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
