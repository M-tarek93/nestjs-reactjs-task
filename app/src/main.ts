import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // Origin should be set by an env variable

  app.use(helmet());
  app.setGlobalPrefix('api'); // use api as global prefix if you don't have subdomain

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('NestJS-ReactJS Task')
    .addServer(process.env.APP_BASE_URL)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  if (process.env.NODE_ENV !== 'prod') {
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
export default bootstrap();
