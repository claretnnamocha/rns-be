import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { displayName } from '../package.json';
import { AppModule } from './app.module';
import { logger } from './common';
import { config, setupConfig } from './common/config';

async function bootstrap() {
  const error = await setupConfig();
  if (error) return logger.error(error);

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(
    session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  if (config.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(`${displayName} API Reference`)
      .addBearerAuth({ type: 'http' }, 'jwt')
      .build();
    SwaggerModule.setup(
      '/api/documentation',
      app,
      SwaggerModule.createDocument(app, swaggerConfig),
    );
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(8780);

  const link = config.BASE_URL;
  const docLink = `${link}/api/documentation`;

  logger.debug(`${displayName} is running on: ${link}`);
  if (config.NODE_ENV !== 'production')
    logger.debug(`Swagger documentation: ${docLink}`);
}
bootstrap();
