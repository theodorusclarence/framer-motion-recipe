import clsx from 'clsx';
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion';
import { ListTodo, Trash } from 'lucide-react';
import * as React from 'react';
import useMeasure from 'react-use-measure';

import IconButton from '@/components/buttons/IconButton';

import { Card } from '@/app/components/card';

type GrowingItemProps = {
  count: number;
  i: number;
  countList: number[];
  setCountList: React.Dispatch<React.SetStateAction<number[]>>;
} & HTMLMotionProps<'div'>;

export const GrowingItem = React.forwardRef<HTMLDivElement, GrowingItemProps>(
  ({ className, count, i, countList, setCountList, ...rest }, ref) => {
    const [isShowingList, setIsShowingList] = React.useState(false);
    const [innerRef, { height }] = useMeasure();

    return (
      <motion.div
        key={count}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: 'auto',
          opacity: 1,
        }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        ref={ref}
        className={className}
        {...rest}
      >
        <motion.div
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
          className={clsx([
            'flex flex-col',
            'py-1',
            i === 0 && 'pt-0',
            i === countList.length - 1 && 'pb-0',
          ])}
        >
          <Card
            key={count}
            // need box content
            className='flex flex-col py-0 box-content'
            initial={{
              opacity: 0,
              height: 0,
              borderWidth: 0,
            }}
            animate={{
              opacity: 1,
              height: height > 0 ? height : 'auto',
              borderWidth: 1,
            }}
            exit={{
              opacity: 0,
              height: 0,
              borderWidth: 0,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div ref={innerRef} className='py-1'>
              <div className='flex items-center justify-between'>
                <p className='text-neutral-950 text-sm'>List Item {count}</p>
                <div className='flex items-center'>
                  <IconButton
                    onClick={() => setIsShowingList((prev) => !prev)}
                    icon={ListTodo}
                    className='text-neutral-600'
                    classNames={{
                      icon: 'size-3.5',
                    }}
                    variant='ghost'
                  />
                  <IconButton
                    onClick={() =>
                      setCountList((prev) => [
                        ...prev.slice(0, i),
                        ...prev.slice(i + 1),
                      ])
                    }
                    icon={Trash}
                    className='text-neutral-600 -mr-2'
                    classNames={{
                      icon: 'size-3.5',
                    }}
                    variant='ghost-danger'
                  />
                </div>
              </div>
              <AnimatePresence mode='popLayout'>
                {isShowingList && (
                  <motion.div
                    className='mt-1 pb-4'
                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        delay: 0.01,
                        duration: 0.1,
                        ease: 'easeOut',
                      },
                    }}
                    exit={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                    transition={{ duration: 0.1, ease: 'easeOut' }}
                  >
                    <ul className='flex flex-col gap-2 relative pl-3'>
                      <div className='absolute left-0 h-full w-0.5 bg-neutral-300 rounded-full' />
                      {Array.from({ length: 3 }).map((_, i) => (
                        <li key={i} className='flex items-center gap-2 '>
                          <input
                            id={`todo-${i}`}
                            type='checkbox'
                            className='rounded size-3.5'
                          />
                          <label
                            htmlFor={`todo-${i}`}
                            className='text-xs text-neutral-700'
                          >
                            Todo item {i + 1}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }
);
