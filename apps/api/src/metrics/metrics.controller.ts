import { Controller, Get, Query } from '@nestjs/common';
import type {
  MetricsHealthResponse,
  MetricsSummaryResponse,
  MetricsTrendResponse,
} from '@repo/types';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('health')
  getHealth(): MetricsHealthResponse {
    return this.metricsService.getHealth();
  }

  @Get('summary')
  getSummary(): MetricsSummaryResponse {
    return this.metricsService.getSummary();
  }

  @Get('trends')
  getTrends(@Query('days') days?: string): MetricsTrendResponse {
    const parsedDays = Number(days);
    const requestedDays = Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : 7;

    return this.metricsService.getTrends(requestedDays);
  }
}
