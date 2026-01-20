import { Test } from '@nestjs/testing';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

describe('MetricsController', () => {
  let controller: MetricsController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MetricsController],
      providers: [MetricsService],
    }).compile();

    controller = moduleRef.get(MetricsController);
  });

  it('returns summary', () => {
    const summary = controller.getSummary();

    expect(summary.totals).toHaveLength(4);
  });

  it('returns trends with default days', () => {
    const trends = controller.getTrends();

    expect(trends.series[0]?.points.length).toBe(7);
  });
});
