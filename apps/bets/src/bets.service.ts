import { Injectable } from '@nestjs/common';

@Injectable()
export class BetsService {
  getHello(): string {
    return 'Hello World!';
  }
}
