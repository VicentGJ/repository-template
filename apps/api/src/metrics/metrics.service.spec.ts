import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(() => {
    service = new MetricsService();
  });

  it('returns health status', () => {
    const health = service.getHealth();

    expect(health.ok).toBe(true);
    expect(health.timestamp).toBeTruthy();
  });

  it('returns summary totals', () => {
    const summary = service.getSummary();

    expect(summary.totals).toHaveLength(4);
    expect(summary.totals[0]?.key).toBe('activeUsers');
  });

  it('returns trend data', () => {
    const trends = service.getTrends(5);

    expect(trends.series).toHaveLength(3);
    expect(trends.series[0]?.points).toHaveLength(5);
  });
});
