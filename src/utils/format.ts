import { format, parseISO } from 'date-fns';

export function currency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export function number(value: number) {
  return new Intl.NumberFormat('en-US').format(value);
}

export function shortDate(value: string) {
  return format(parseISO(value), 'MMM d, yyyy');
}

export function timeLabel(value: string) {
  return format(parseISO(value), 'hh:mm a');
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function percentage(value: number) {
  return `${Math.round(value)}%`;
}