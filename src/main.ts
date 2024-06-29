import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from './app.module';
import { DataSource } from 'typeorm'; // Asegúrate de importar DataSource si estás usando TypeORM

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Habilitar CORS
  app.enableCors({
    origin: ['https://ezhub.vercel.app'], // Asegúrate de incluir el dominio del frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Establecer prefijo global para las rutas API
  app.setGlobalPrefix('api');

  // Usar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

    const config = new DocumentBuilder()
    .setTitle("Ezhub API")
    .setDescription("API documentation for Ezhub backend")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  // Obtener el puerto del servicio de configuración o usar el puerto 3000 por defecto
  const configService = app.get(ConfigService);
  const port = process.env.PORT || 3000;

  // Probar la conexión a la base de datos (opcional)
  const dataSource = app.get(DataSource);
  try {
    await dataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }

  // Iniciar la aplicación
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
