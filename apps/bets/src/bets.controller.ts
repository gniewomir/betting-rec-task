import { Controller, Get } from '@nestjs/common';
import { BetsService } from './bets.service';

@Controller()
export class BetsController {
  constructor(private readonly betsService: BetsService) {}

  @Get()
  getHello(): string {
    return this.betsService.getHello();
  }
}
