'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function GoBackButton() {
  const router = useRouter();
  return (
    <Button onClick={() => router.back()} className="w-full">
      Go Back
    </Button>
  );
}
