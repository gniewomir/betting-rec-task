import { Test, TestingModule } from '@nestjs/testing';
import { OddsController } from './odds.controller';
import { OddsService } from './odds.service';

describe('OddsController', () => {
  let oddsController: OddsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OddsController],
      providers: [OddsService],
    }).compile();

    oddsController = app.get<OddsController>(OddsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(oddsController.getHello()).toBe('Hello World!');
    });
  });
});
