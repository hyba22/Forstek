import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      skipMissingProperties: true,
      forbidNonWhitelisted: false,
      disableErrorMessages: false,
      validateCustomDecorators: false,
    }),
  );

  const uploadsPath = 'C:\\Users\\Hyba\\Desktop\\Tek Up\\DWMM\\S2\\Développement du projet\\Forstek\\server\\uploads';
  Logger.log(`Serving static assets from: ${uploadsPath}`, 'Bootstrap');
  if (fs.existsSync(uploadsPath)) {
    Logger.log(`Uploads directory exists and contains: ${fs.readdirSync(uploadsPath)}`, 'Bootstrap');
    const targetFiles = fs.readdirSync(uploadsPath).map(file => join(uploadsPath, file));
    Logger.log(`All files in directory: ${targetFiles}`, 'Bootstrap');
    const targetFile = join(uploadsPath, '1747257912589-Wassim_Soltani_Resume_Creative.pdf');
    Logger.log(`Checking for target file: ${targetFile}`, 'Bootstrap');
    Logger.log(`Target file exists: ${fs.existsSync(targetFile)}`, 'Bootstrap');
    if (!fs.existsSync(targetFile)) {
      Logger.error(`Target file not found at: ${targetFile}. Available files: ${fs.readdirSync(uploadsPath)}`, 'Bootstrap');
    }
  } else {
    Logger.error(`Uploads directory does not exist at: ${uploadsPath}`, 'Bootstrap');
  }

  app.use('/api/uploads', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Logger.log(`Request for static file: ${req.url}`, 'StaticMiddleware');
    const fileName = req.url.split('/').pop();
    if (!fileName) {
      Logger.error('No filename extracted from URL', 'StaticMiddleware');
      res.status(400).send('Invalid URL: No filename provided');
      return;
    }

    const filePath = join(uploadsPath, fileName);
    Logger.log(`Resolved file path: ${filePath}`, 'StaticMiddleware');
    if (fs.existsSync(filePath)) {
      Logger.log(`File found at: ${filePath}`, 'StaticMiddleware');
      res.setHeader('Content-Type', 'application/pdf'); 
      res.setHeader('Content-Disposition', `inline; filename="${fileName}"`); 
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    } else {
      Logger.error(`File not found at: ${filePath}. Available files: ${fs.readdirSync(uploadsPath)}`, 'StaticMiddleware');
      res.status(404).send('File not found');
      return;
    }
    next();
  }, express.static(uploadsPath));

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log('Request headers:', req.headers);
    console.log('Request body (if any):', req.body);
    next();
  });

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000', 'Bootstrap');
}
bootstrap();