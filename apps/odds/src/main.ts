import { NestFactory } from '@nestjs/core';
import { OddsModule } from './odds.module';

async function bootstrap() {
  const app = await NestFactory.create(OddsModule);
  await app.listen(process.env.port ?? 3010);
}
void bootstrap();
