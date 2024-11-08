'use client';

import { ChefHat } from 'lucide-react';
import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

import ArrowLink from '@/components/links/ArrowLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import UnderlineLink from '@/components/links/UnderlineLink';

const patterns = {
  '/simple-list': 'Simple List Animation',
  '/growing-list-item': 'List Animation with Changing Item',
};

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <ChefHat size={48} className='text-cyan-500' />
          <h1 className='mt-4'>Framer Motion Recipe</h1>
          <p className='mt-2 text-sm text-gray-800'>
            Collection of recipes for Framer Motion
          </p>
          <p className='mt-2 text-sm text-gray-700'>
            <ArrowLink href='https://github.com/theodorusclarence/framer-motion-recipe'>
              See the repository
            </ArrowLink>
          </p>

          <div className='mt-8 space-y-2 flex flex-col'>
            <p className='font-semibold text-sm'>Recipes:</p>
            <ul>
              {Object.entries(patterns).map(([path, title]) => (
                <li className='list-disc text-left' key={path}>
                  <PrimaryLink className='text-sm' href={path}>
                    {title}
                  </PrimaryLink>
                </li>
              ))}
            </ul>
          </div>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
              Theodorus Clarence
            </UnderlineLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
