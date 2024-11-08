import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'framer-motion';
import { Trash } from 'lucide-react';
import * as React from 'react';

import IconButton from '@/components/buttons/IconButton';

import { Card } from '@/app/components/card';

type SimpleItemProps = {
  count: number;
  i: number;
  countList: number[];
  setCountList: React.Dispatch<React.SetStateAction<number[]>>;
} & HTMLMotionProps<'div'>;

export const SimpleItem = React.forwardRef<HTMLDivElement, SimpleItemProps>(
  ({ className, count, i, countList, setCountList, ...rest }, ref) => {
    return (
      <motion.div
        key={count}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        ref={ref}
        className={className}
        {...rest}
      >
        <div
          className={clsx([
            'py-1',
            i === 0 && 'pt-0',
            i === countList.length - 1 && 'pb-0',
          ])}
        >
          <Card
            key={count}
            className={clsx(['flex items-center justify-between'])}
            initial={{
              opacity: 0,
              y: -8,
              scale: 0.98,
              filter: 'blur(4px)',
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
              filter: 'blur(4px)',
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <p className='text-neutral-950 text-sm'>List Item {count}</p>
            <IconButton
              onClick={() =>
                setCountList((prev) => [
                  ...prev.slice(0, i),
                  ...prev.slice(i + 1),
                ])
              }
              variant='ghost'
              icon={Trash}
              classNames={{
                icon: 'size-3.5',
              }}
              className={clsx([
                'rounded-xl -mr-2',
                'hover:bg-red-50 active:bg-red-100 disabled:bg-red-100',
                'hover:text-red-500 active:text-red-600 disabled:text-red-600',
              ])}
            />
          </Card>
        </div>
      </motion.div>
    );
  }
);
