import React, { HTMLAttributes, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface WrapperProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function Wrapper({
  children,
  className,
  ...rest
}: WrapperProps) {
  return (
    <Card {...rest} className={cn('w-96', className)}>
      {children}
    </Card>
  );
}
