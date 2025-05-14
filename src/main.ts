import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that have no decorators
      forbidNonWhitelisted: true, // ❗ Throw error if unknown properties are present
      forbidUnknownValues: true, // ❗ Throw error on completely invalid inputs (e.g., null)
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://taktek-company-panel-1.onrender.com',
      'https://company.taktek.app',
      'https://www.taktek.app',
      'http://localhost:3001',
      'https://dashboard.ranktitan.ai',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3010);
}
bootstrap();
