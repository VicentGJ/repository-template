export type MetricTrendPoint = {
  timestamp: string;
  value: number;
};

export type MetricTrend = {
  key: string;
  label: string;
  points: MetricTrendPoint[];
};

export type MetricSummary = {
  key: string;
  label: string;
  value: number;
  change: number;
  unit?: string;
};

export type MetricsSummaryResponse = {
  generatedAt: string;
  totals: MetricSummary[];
};

export type MetricsTrendResponse = {
  generatedAt: string;
  range: {
    from: string;
    to: string;
    interval: string;
  };
  series: MetricTrend[];
};

export type MetricsHealthResponse = {
  ok: true;
  timestamp: string;
};
