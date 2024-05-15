import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import notFound from '../../../public/not-found.svg';
import GoBackButton from '@/components/shared/go-back';

export default function NotFoundPage() {
  return (
    <Card className="w-[400px] border border-primary">
      <CardContent className="flex flex-col items-center justify-center space-y-8 p-6">
        <Image
          src={notFound}
          height={300}
          width={300}
          alt="not-found"
          className="object-cover opacity-75"
        />
        <p className="text-center text-sm capitalize text-primary underline md:text-lg">
          The page your looking for was not found
        </p>

        <GoBackButton />
      </CardContent>
    </Card>
  );
}
