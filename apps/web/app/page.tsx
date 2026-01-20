import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-12">
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Repo Template</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Monorepo demo with NestJS + Next.js
          </h1>
          <p className="text-base text-muted-foreground">
            This starter includes a lightweight metrics API, shared TypeScript types, and a
            dashboard UI built with shadcn primitives.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/dashboard">View dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/api">View API routes</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Shared Types</CardTitle>
              <CardDescription>Type-safe metrics data from API to UI.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Types live in <code className="rounded bg-muted px-1">@repo/types</code>.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fast API</CardTitle>
              <CardDescription>Three endpoints with demo metrics.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Explore <code className="rounded bg-muted px-1">/metrics/summary</code> and
              <code className="rounded bg-muted px-1">/metrics/trends</code>.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Composable UI</CardTitle>
              <CardDescription>shadcn-styled cards, tables, and tabs.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Ready for deeper dashboards and charting.
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
