import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import DashboardPage from './page';
import type {
  MetricsHealthResponse,
  MetricsSummaryResponse,
  MetricsTrendResponse,
} from '@repo/types';

vi.mock('@/lib/metrics', () => ({
  fetchMetricsSummary: vi.fn(),
  fetchMetricsTrends: vi.fn(),
  fetchMetricsHealth: vi.fn(),
}));

const { fetchMetricsSummary, fetchMetricsTrends, fetchMetricsHealth } =
  await import('@/lib/metrics');

const mockSummary: MetricsSummaryResponse = {
  generatedAt: '2025-01-01T00:00:00.000Z',
  totals: [
    {
      key: 'activeUsers',
      label: 'Active Users',
      value: 1234,
      change: 5,
      unit: '',
    },
    {
      key: 'apiUptime',
      label: 'API Uptime',
      value: 99.9,
      change: 0.1,
      unit: '%',
    },
    {
      key: 'avgLatency',
      label: 'Avg Latency',
      value: 250,
      change: -2.5,
      unit: 'ms',
    },
    {
      key: 'errorRate',
      label: 'Error Rate',
      value: 0.2,
      change: -0.05,
      unit: '%',
    },
  ],
};

const mockTrends: MetricsTrendResponse = {
  generatedAt: '2025-01-01T00:00:00.000Z',
  range: {
    from: '2024-12-25T00:00:00.000Z',
    to: '2025-01-01T00:00:00.000Z',
    interval: 'P1D',
  },
  series: [
    {
      key: 'requests',
      label: 'Requests',
      points: [
        { timestamp: '2025-01-01T00:00:00.000Z', value: 100 },
        { timestamp: '2025-01-02T00:00:00.000Z', value: 120 },
      ],
    },
    {
      key: 'errors',
      label: 'Errors',
      points: [
        { timestamp: '2025-01-01T00:00:00.000Z', value: 5 },
        { timestamp: '2025-01-02T00:00:00.000Z', value: 2 },
      ],
    },
    {
      key: 'latency',
      label: 'Latency (ms)',
      points: [{ timestamp: '2025-01-01T00:00:00.000Z', value: 220 }],
    },
  ],
};

const mockRequestsSeries = mockTrends.series[0]!;

const mockHealth: MetricsHealthResponse = {
  ok: true,
  timestamp: '2025-01-01T00:00:00.000Z',
};

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.mocked(fetchMetricsSummary).mockResolvedValue(mockSummary);
    vi.mocked(fetchMetricsTrends).mockResolvedValue(mockTrends);
    vi.mocked(fetchMetricsHealth).mockResolvedValue(mockHealth);
  });

  it('renders metric cards with data', async () => {
    const view = await DashboardPage();
    render(view);

    mockSummary.totals.forEach((metric) => {
      expect(screen.getByText(metric.label)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(String(metric.value)))).toBeInTheDocument();
    });
  });

  it('shows the health badge status', async () => {
    const view = await DashboardPage();
    render(view);

    expect(screen.getByText('API Healthy')).toBeInTheDocument();
  });

  it('renders tabs for each trend series', async () => {
    const view = await DashboardPage();
    render(view);

    mockTrends.series.forEach((series) => {
      expect(screen.getByRole('tab', { name: series.label })).toBeInTheDocument();
    });
  });

  it('shows data points in the trend table', async () => {
    const view = await DashboardPage();
    render(view);

    expect(screen.getByText('Requests trend')).toBeInTheDocument();

    mockRequestsSeries.points.forEach((point) => {
      expect(screen.getByText(String(point.value))).toBeInTheDocument();
    });
  });

  it('renders the back navigation button', async () => {
    const view = await DashboardPage();
    render(view);

    const [backLink] = screen.getAllByRole('link');
    expect(backLink).toHaveAttribute('href', '/');
  });
});
