import type {
  MetricsHealthResponse,
  MetricsSummaryResponse,
  MetricsTrendResponse,
} from '@repo/types';

import { apiFetch } from './api';

export async function fetchMetricsSummary(): Promise<MetricsSummaryResponse> {
  return apiFetch('/metrics/summary', { next: { revalidate: 60 } });
}

export async function fetchMetricsTrends(days = 7): Promise<MetricsTrendResponse> {
  return apiFetch(`/metrics/trends?days=${days}`, { next: { revalidate: 60 } });
}

export async function fetchMetricsHealth(): Promise<MetricsHealthResponse> {
  return apiFetch('/metrics/health', { cache: 'no-store' });
}
