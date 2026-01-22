'use client';

import { AlertTriangle, Copy, RefreshCw } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { parseApiError } from '@/lib/api';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  // Parse details from the error message (survives Next.js serialization)
  const { message, details } = useMemo(() => parseApiError(error), [error]);

  const causeMessage =
    error.cause instanceof Error ? error.cause.message : String(error.cause ?? '');

  const formatDebugInfo = () => {
    const lines = [
      `Message: ${message}`,
      `Digest: ${error.digest ?? 'N/A'}`,
      `Cause: ${causeMessage || 'N/A'}`,
      `Timestamp: ${new Date().toISOString()}`,
    ];

    if (details) {
      lines.push(
        '',
        'Request Details:',
        `  URL: ${details.url}`,
        `  Method: ${details.method}`,
        `  Base URL: ${details.baseUrl}`,
        `  Path: ${details.path}`,
        `  Elapsed: ${details.elapsed}ms`,
      );
      if (details.status) lines.push(`  Status: ${details.status} ${details.statusText ?? ''}`);
      if (details.code) lines.push(`  Error Code: ${details.code}`);
      if (details.originalError) lines.push(`  Original Error: ${details.originalError}`);
    }

    lines.push(
      '',
      'Stack Trace:',
      ...(error.stack?.split('\n').map((line) => `  ${line}`) ?? ['  N/A']),
    );

    return lines.join('\n');
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(formatDebugInfo());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <CardTitle>Failed to load dashboard</CardTitle>
              <CardDescription>An error occurred while fetching data from the API</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Error Message</p>
            <p className="font-mono text-sm text-destructive">{message}</p>
          </div>

          {details && (
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">Request</p>
              <p className="font-mono text-sm">
                {details.method} {details.url}
              </p>
              {details.code && (
                <p className="mt-1 font-mono text-sm text-destructive">Code: {details.code}</p>
              )}
              {details.status && (
                <p className="mt-1 font-mono text-sm">
                  Status: {details.status} {details.statusText}
                </p>
              )}
              <p className="mt-1 text-xs text-muted-foreground">Elapsed: {details.elapsed}ms</p>
            </div>
          )}

          {causeMessage && (
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">Cause</p>
              <p className="font-mono text-sm">{causeMessage}</p>
            </div>
          )}

          {error.digest && (
            <div className="rounded-lg bg-muted p-4">
              <p className="mb-2 text-sm font-medium text-muted-foreground">Error Digest</p>
              <p className="font-mono text-sm">{error.digest}</p>
            </div>
          )}

          <details className="rounded-lg border p-4">
            <summary className="cursor-pointer text-sm font-medium text-muted-foreground">
              Full Debug Info
            </summary>
            <pre className="mt-4 max-h-64 overflow-auto whitespace-pre-wrap break-words rounded bg-muted p-4 text-xs">
              {formatDebugInfo()}
            </pre>
          </details>

          <div className="flex gap-3">
            <Button onClick={reset} className="flex-1">
              <RefreshCw size={16} />
              Try Again
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy Debug Info'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
