import { Injectable } from '@nestjs/common';
import type {
  MetricsHealthResponse,
  MetricsSummaryResponse,
  MetricsTrendResponse,
} from '@repo/types';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class MetricsService {
  getHealth(): MetricsHealthResponse {
    return {
      ok: true,
      timestamp: new Date().toISOString(),
    };
  }

  getSummary(): MetricsSummaryResponse {
    return {
      generatedAt: new Date().toISOString(),
      totals: [
        {
          key: 'activeUsers',
          label: 'Active users',
          value: 1842,
          change: 8.4,
        },
        {
          key: 'apiUptime',
          label: 'API uptime',
          value: 99.95,
          change: 0.2,
          unit: '%',
        },
        {
          key: 'avgLatency',
          label: 'Avg latency',
          value: 187,
          change: -12.5,
          unit: 'ms',
        },
        {
          key: 'errorRate',
          label: 'Error rate',
          value: 0.42,
          change: -0.08,
          unit: '%',
        },
      ],
    };
  }

  getTrends(days = 7): MetricsTrendResponse {
    const now = new Date();
    const end = new Date(now.getTime());
    const start = new Date(now.getTime() - days * DAY_IN_MS);

    return {
      generatedAt: now.toISOString(),
      range: {
        from: start.toISOString(),
        to: end.toISOString(),
        interval: 'P1D',
      },
      series: [
        {
          key: 'requests',
          label: 'Requests',
          points: this.buildSeries(start, days, 620, 48),
        },
        {
          key: 'errors',
          label: 'Errors',
          points: this.buildSeries(start, days, 9, 3),
        },
        {
          key: 'latency',
          label: 'Latency (ms)',
          points: this.buildSeries(start, days, 220, 22),
        },
      ],
    };
  }

  private buildSeries(start: Date, days: number, base: number, variance: number) {
    return Array.from({ length: days }, (_, index) => {
      const timestamp = new Date(start.getTime() + index * DAY_IN_MS);
      const jitter = (index % 2 === 0 ? 1 : -1) * (variance * 0.4);
      const wave = Math.sin(index / 2) * variance;

      return {
        timestamp: timestamp.toISOString(),
        value: Math.round((base + wave + jitter) * 100) / 100,
      };
    });
  }
}
