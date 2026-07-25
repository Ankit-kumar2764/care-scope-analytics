import type { HTMLAttributes, TableHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type TableWrapperProps = HTMLAttributes<HTMLDivElement>;
type TableProps = TableHTMLAttributes<HTMLTableElement>;

export function TableWrapper({ className, ...props }: TableWrapperProps) {
  return <div className={cn('w-full overflow-hidden rounded-[16px] border border-border bg-card shadow-card', className)} {...props} />;
}

export function Table({ className, ...props }: TableProps) {
  return <table className={cn('w-full border-separate border-spacing-0 text-sm', className)} {...props} />;
}

export function TableHeader({ className, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-muted/30 text-left text-xs uppercase tracking-[0.2em] text-muted-foreground', className)} {...props} />;
}

export function TableBody({ className, ...props }: TableHTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-border bg-card text-foreground', className)} {...props} />;
}

export function TableRow({ className, ...props }: TableHTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('transition-colors hover:bg-muted/25', className)} {...props} />;
}

export function TableHead({ className, ...props }: TableHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('px-5 py-4 font-medium first:pl-6 last:pr-6', className)} {...props} />;
}

export function TableCell({ className, ...props }: TableHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-5 py-4 align-middle first:pl-6 last:pr-6', className)} {...props} />;
}