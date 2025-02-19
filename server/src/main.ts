import { NestFactory } from '@nestjs/core';
import { VehicleModule } from './vehicle/vehicle.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(VehicleModule);
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Vehicle Fleet API')
    .setDescription('API documentation for Vehicle Fleet API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
