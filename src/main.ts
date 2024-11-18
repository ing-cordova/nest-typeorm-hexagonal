import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()
    .setTitle('NEST & TYPEORM API TEMPLATE')
    .setDescription('This is a template for a REST API using NEST and TYPEORM with Hexagonal Architecture')
    .setVersion('1.0')
    .build();

  /**
   * Swagger Documentation Configuration
   */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT') || 3000; // Obtén el puerto de la configuración

  await app.listen(port);
}
bootstrap();
