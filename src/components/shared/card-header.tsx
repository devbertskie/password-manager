import React, { ElementType, HTMLAttributes } from 'react';

import {
  CardDescription,
  CardTitle,
  CardHeader as Header,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardHeaderProps extends HTMLAttributes<HTMLElement> {
  title: string;
  label?: string;
  Icon: ElementType;
}

export default function CardHeader({
  title,
  label,
  Icon,
  className,
  ...rest
}: CardHeaderProps) {
  return (
    <Header
      className={cn('flex flex-col items-center justify-center', className)}
      {...rest}
    >
      <Icon className="size-10 text-primary" />
      <CardTitle className="mb-2 text-center text-2xl font-semibold tracking-tight text-primary">
        {title}
      </CardTitle>
      <CardDescription className="text-center text-sm text-muted-foreground">
        {label}
      </CardDescription>
    </Header>
  );
}
