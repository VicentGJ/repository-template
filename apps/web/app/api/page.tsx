import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchMetricsHealth, fetchMetricsSummary, fetchMetricsTrends } from '@/lib/metrics';

export default async function ApiPage() {
  const [summary, trends, health] = await Promise.all([
    fetchMetricsSummary(),
    fetchMetricsTrends(),
    fetchMetricsHealth(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
        <header>
          <Button variant="ghost" size="icon" asChild className="-ml-3 mb-2">
            <Link href="/">
              <ArrowLeft size={16} />
            </Link>
          </Button>
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">API</p>
          <h1 className="text-3xl font-semibold">Live payloads</h1>
          <p className="mt-2 text-muted-foreground">
            These responses are fetched directly from the NestJS metrics endpoints.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Health</CardTitle>
            <CardDescription>/metrics/health</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              {JSON.stringify(health, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>/metrics/summary</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              {JSON.stringify(summary, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trends</CardTitle>
            <CardDescription>/metrics/trends</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm">
              {JSON.stringify(trends, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
