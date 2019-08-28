import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  // console.log(serverConfig);
  const app = await NestFactory.create(AppModule);
  
  // CORS : Cross-origin resoure sharing : là 1 cơ chế cho phép tài nguyên sở dụng ở 1 domain khác ( port )
  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
