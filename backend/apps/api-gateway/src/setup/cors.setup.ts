import { INestApplication } from '@nestjs/common';

export function setupCors(app: INestApplication): void {
  const corsOrigin = process.env.CORS_ORIGIN;
  
  // Support multiple origins separated by comma
  const allowedOrigins = corsOrigin 
    ? corsOrigin.split(',').map(origin => origin.trim())
    : ['*'];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
}

