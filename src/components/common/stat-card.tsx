import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/cn';

type StatCardProps = {
  label: string;
  value: ReactNode;
  delta?: string;
  icon?: ReactNode;
  tone?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
};

const toneStyles = {
  primary: 'from-primary/10 to-primary/5 text-primary',
  success: 'from-success/15 to-success/5 text-success',
  info: 'from-info/15 to-info/5 text-info',
  warning: 'from-warning/20 to-warning/10 text-warning-foreground',
  danger: 'from-danger/10 to-danger/5 text-danger',
} as const;

export function StatCard({ label, value, delta, icon, tone = 'primary' }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</div>
          {delta ? <p className="mt-2 text-sm font-medium text-success">{delta}</p> : null}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-soft', toneStyles[tone])}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}