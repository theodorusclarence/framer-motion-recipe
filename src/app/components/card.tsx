import { HTMLMotionProps, motion } from 'framer-motion';
import * as React from 'react';

import { cn } from '@/lib/utils';

type CardProps = {
  children?: React.ReactNode;
} & HTMLMotionProps<'div'>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <motion.div
        className={cn([
          'bg-neutral-50',
          'px-4 py-1 rounded-xl',
          'border border-gray-300',
          className,
        ])}
        {...rest}
        ref={ref}
      >
        {children}
      </motion.div>
    );
  }
);
