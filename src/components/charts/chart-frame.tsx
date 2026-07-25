import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ChartLegendItem = {
  label: string;
  color: string;
};

type ChartFrameProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: string;
  actions?: ReactNode;
  legend?: ChartLegendItem[];
  children: ReactNode;
};

export function ChartFrame({ className, title, description, actions, legend, children, ...props }: ChartFrameProps) {
  return (
    <section className={cn('rounded-[16px] border border-border bg-card p-6 shadow-card', className)} {...props}>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>

      {legend && legend.length > 0 ? (
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {legend.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      ) : null}

      <div className="rounded-2xl bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(248,250,252,0.92))] p-1 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.85),rgba(15,23,42,0.96))]">
        {children}
      </div>
    </section>
  );
}