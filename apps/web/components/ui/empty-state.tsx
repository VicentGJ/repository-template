import { cn } from '@/lib/utils';

type EmptyStateProps = {
  title: string;
  description: string;
  className?: string;
};

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div className={cn('rounded-lg border border-dashed p-6 text-center', className)}>
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
