import { motion, useReducedMotion } from 'framer-motion';

type AnimatedNumberProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  formatter?: (value: number) => string;
};

export function AnimatedNumber({ value, prefix = '', suffix = '', formatter }: AnimatedNumberProps) {
  const reduceMotion = useReducedMotion();
  const content = formatter ? formatter(value) : new Intl.NumberFormat('en-US').format(value);

  if (reduceMotion) {
    return (
      <span>
        {prefix}
        {content}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {prefix}
      {content}
      {suffix}
    </motion.span>
  );
}