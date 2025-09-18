import { NestFactory } from '@nestjs/core';
import { BetsModule } from './bets.module';

async function bootstrap() {
  const app = await NestFactory.create(BetsModule);
  await app.listen(process.env.port ?? 3020);
}
void bootstrap();
