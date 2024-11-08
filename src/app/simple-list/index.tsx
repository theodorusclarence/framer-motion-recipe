'use client';

import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import ArrowLink from '@/components/links/ArrowLink';

import { SimpleItem } from '@/app/simple-list/simple-item';

export default function SimpleList() {
  const [countList, setCountList] = React.useState([1, 2, 3, 4, 5]);

  return (
    <main>
      <section className='bg-neutral-50'>
        <div className='layout max-w-lg min-h-screen py-20'>
          <h1>Simple List</h1>
          <p className='text-neutral-500 text-sm mt-2'>
            Animating height to auto.{' '}
            <ArrowLink
              className='text-neutral-600'
              href='https://github.com/theodorusclarence/framer-motion-recipe/blob/main/src/app/simple-list'
            >
              See the files
            </ArrowLink>
          </p>

          <Button
            className='mt-8 w-full justify-center'
            variant='new'
            size='sm'
            onClick={() =>
              setCountList((prev) => [
                ...prev,
                (prev[prev.length - 1] ?? 0) + 1,
              ])
            }
          >
            Add Item
          </Button>
          <div className='mt-2'>
            <AnimatePresence initial={false}>
              {countList.map((count, i) => (
                <SimpleItem
                  key={count}
                  i={i}
                  count={count}
                  countList={countList}
                  setCountList={setCountList}
                />
              ))}
            </AnimatePresence>
          </div>
          <div
            className={clsx([
              'pt-4 bg-neutral-50 flex items-center justify-between',
            ])}
          >
            <p className='text-neutral-500 text-sm'>
              Total count: {countList.length}
            </p>

            <Button
              className='justify-center'
              variant='new'
              size='sm'
              onClick={() => setCountList([])}
            >
              Delete all
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
