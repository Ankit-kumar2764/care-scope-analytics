import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn('skeleton-shimmer rounded-xl bg-muted/70', className)} aria-hidden="true" {...props} />;
}