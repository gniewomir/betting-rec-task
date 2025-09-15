import { Controller, Get } from '@nestjs/common';
import { OddsService } from './odds.service';

@Controller()
export class OddsController {
  constructor(private readonly oddsService: OddsService) {}

  @Get()
  getHello(): string {
    return this.oddsService.getHello();
  }
}
