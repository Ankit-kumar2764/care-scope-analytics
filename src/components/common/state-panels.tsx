import { AlertTriangle, Inbox, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';

type StateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function LoadingState({ title = 'Loading data', description = 'Pulling the latest mock healthcare records...' }: Partial<StateProps>) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-[16px] border border-border bg-card p-8 text-center shadow-card">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="h-2 w-56 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 rounded-full bg-primary/80 motion-safe:animate-pulse" />
      </div>
    </div>
  );
}

export function ErrorState({ title, description, actionLabel = 'Retry', onAction }: StateProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-[16px] border border-danger/20 bg-danger/5 p-8 text-center shadow-card">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10 text-danger">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      <Button tone="primary" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}

export function EmptyState({ title, description, actionLabel, onAction }: StateProps) {
  return (
    <div className="flex min-h-[36vh] flex-col items-center justify-center gap-4 rounded-[16px] border border-border bg-card p-8 text-center shadow-card">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
        <Inbox className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
      {actionLabel ? (
        <Button tone="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}