import { Test, TestingModule } from '@nestjs/testing';
import { BetsController } from './bets.controller';
import { BetsService } from './bets.service';

describe('BetsController', () => {
  let betsController: BetsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BetsController],
      providers: [BetsService],
    }).compile();

    betsController = app.get<BetsController>(BetsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(betsController.getHello()).toBe('Hello World!');
    });
  });
});
