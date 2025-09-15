import { Module } from '@nestjs/common';
import { OddsController } from './odds.controller';
import { OddsService } from './odds.service';

@Module({
  imports: [],
  controllers: [OddsController],
  providers: [OddsService],
})
export class OddsModule {}
