import { Injectable } from '@nestjs/common';

@Injectable()
export class OddsService {
  getHello(): string {
    return 'Hello World!';
  }
}
