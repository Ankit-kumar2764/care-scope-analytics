import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type ButtonTone = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: ButtonTone;
  size?: ButtonSize;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

const toneStyles: Record<ButtonTone, string> = {
  primary: 'bg-primary text-primary-foreground shadow-card hover:bg-[#1D4ED8] focus-visible:ring-primary/30',
  secondary: 'bg-secondary text-secondary-foreground shadow-soft hover:bg-[#1E40AF] focus-visible:ring-secondary/30',
  outline: 'border border-border bg-card text-foreground hover:bg-muted/40 hover:text-foreground',
  ghost: 'bg-transparent text-foreground hover:bg-muted/60',
  danger: 'bg-danger text-danger-foreground shadow-soft hover:bg-[#B91C1C] focus-visible:ring-danger/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 rounded-lg px-3 text-sm',
  md: 'h-11 rounded-xl px-4 text-sm',
  lg: 'h-12 rounded-xl px-6 text-base',
  icon: 'h-11 w-11 rounded-xl',
};

export function Button({
  className,
  children,
  tone = 'primary',
  size = 'md',
  leadingIcon,
  trailingIcon,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 ease-premium focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-50',
        'border border-transparent',
        toneStyles[tone],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}