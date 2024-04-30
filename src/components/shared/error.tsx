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
    <Card className="w-[400px] border-0">
      {/* <CardHeader className="text-center">
        <CardTitle className="text-xl md:text-3xl">404</CardTitle>
      </CardHeader> */}
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
        <Image
          src={errorImage}
          height={300}
          width={300}
          alt="not-found"
          className="object-cover opacity-75"
        />
        {JSON.stringify(error)}
        <Button onClick={() => reset()}>Try again</Button>
      </CardContent>
    </Card>
  );
}
