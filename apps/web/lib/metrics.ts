import type {
  MetricsHealthResponse,
  MetricsSummaryResponse,
  MetricsTrendResponse,
} from '@repo/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export async function fetchMetricsSummary(): Promise<MetricsSummaryResponse> {
  const response = await fetch(`${API_BASE_URL}/metrics/summary`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to load metrics summary');
  }

  return response.json();
}

export async function fetchMetricsTrends(days = 7): Promise<MetricsTrendResponse> {
  const response = await fetch(`${API_BASE_URL}/metrics/trends?days=${days}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to load metrics trends');
  }

  return response.json();
}

export async function fetchMetricsHealth(): Promise<MetricsHealthResponse> {
  const response = await fetch(`${API_BASE_URL}/metrics/health`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to load health');
  }

  return response.json();
}
