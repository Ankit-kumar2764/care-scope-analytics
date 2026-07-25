import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type BadgeTone = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'muted';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneStyles: Record<BadgeTone, string> = {
  default: 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
  success: 'bg-success/10 text-success ring-1 ring-inset ring-success/20',
  warning: 'bg-warning/15 text-warning-foreground ring-1 ring-inset ring-warning/20',
  danger: 'bg-danger/10 text-danger ring-1 ring-inset ring-danger/20',
  info: 'bg-info/10 text-info ring-1 ring-inset ring-info/20',
  muted: 'bg-muted text-muted-foreground ring-1 ring-inset ring-border',
};

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide',
        toneStyles[tone],
        className,
      )}
      {...props}
    />
  );
}