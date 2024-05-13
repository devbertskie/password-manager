'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import errorImage from '../../../public/error.svg';

import { Button } from '@/components/ui/button';

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <Card className="w-[400px] border border-destructive">
      <CardContent className="flex flex-col items-center justify-center space-y-8 p-6">
        <Image
          src={errorImage}
          height={300}
          width={300}
          alt="not-found"
          className="object-cover opacity-75"
        />
        <p className="text-sm capitalize text-destructive underline md:text-lg">
          Unexpected Error occur
        </p>
        <p className="hidden">{error.message}</p>
        <Button variant="destructive" onClick={() => reset()}>
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
