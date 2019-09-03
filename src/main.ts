import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');
  // console.log(serverConfig);
  const app = await NestFactory.create(AppModule);
  // config path global localhost:3000...
  app.setGlobalPrefix('/api/v1');
  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Task To do')
    .setDescription('The tasks API description')
    .setVersion('1.0')
    .addTag('tasks') // controller => sd .ApiUseTags('tasks)
    .setBasePath('/api/v1') 
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);

  // CORS : Cross-origin resoure sharing : là 1 cơ chế cho phép tài nguyên sở dụng ở 1 domain khác ( port )
  if(process.env.NODE_ENV === 'development'){
    app.enableCors();
  }
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}/api/v1`, 'Bootstrap');
}
bootstrap();
