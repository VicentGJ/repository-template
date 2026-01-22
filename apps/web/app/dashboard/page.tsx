import { Activity, AlertTriangle, ArrowLeft, Clock, Users } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchMetricsHealth, fetchMetricsSummary, fetchMetricsTrends } from '@/lib/metrics';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const [summary, trends, health] = await Promise.all([
    fetchMetricsSummary(),
    fetchMetricsTrends(),
    fetchMetricsHealth(),
  ]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Button variant="ghost" size="icon" asChild className="-ml-3 mb-2">
              <Link href="/">
                <ArrowLeft size={16} />
              </Link>
            </Button>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Metrics</p>
            <h1 className="text-4xl font-semibold tracking-tight">Platform overview</h1>
            <p className="mt-2 text-muted-foreground">
              Demo dashboard pulling data from the NestJS metrics endpoints.
            </p>
          </div>
          <Badge variant="outline">API {health.ok ? 'Healthy' : 'Degraded'}</Badge>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {summary.totals.map((metric, index) => {
            const Icon = [Users, Activity, Clock, AlertTriangle][index] ?? Activity;
            const changeTone = metric.change >= 0 ? 'text-emerald-500' : 'text-rose-500';

            return (
              <Card key={metric.key}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {metric.value}
                    {metric.unit ?? ''}
                  </div>
                  <p className={`text-xs ${changeTone}`}>{metric.change}% vs last week</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <Tabs defaultValue={trends.series[0]?.key ?? 'requests'}>
          <TabsList>
            {trends.series.map((series) => (
              <TabsTrigger key={series.key} value={series.key}>
                {series.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {trends.series.map((series) => (
            <TabsContent key={series.key} value={series.key}>
              <Card>
                <CardHeader>
                  <CardTitle>{series.label} trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {series.points.map((point) => (
                        <TableRow key={point.timestamp}>
                          <TableCell>
                            {new Date(point.timestamp).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </TableCell>
                          <TableCell>{point.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
