import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import notFound from '../../../public/not-found.svg';
import GoBackButton from '@/components/shared/go-back';

export default function NotFoundPage() {
  return (
    <Card className="w-[400px] border-0">
      {/* <CardHeader className="text-center">
        <CardTitle className="text-xl md:text-3xl">404</CardTitle>
      </CardHeader> */}
      <CardContent className="flex flex-col items-center justify-center space-y-4 p-6">
        <Image
          src={notFound}
          height={300}
          width={300}
          alt="not-found"
          className="object-cover opacity-75"
        />

        <GoBackButton />
      </CardContent>
    </Card>
  );
}
