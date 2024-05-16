import { Info } from 'lucide-react';
import React from 'react';

interface ItemEmptyPageProps {
  label: string;
}

export default function ItemEmptyPage({ label }: ItemEmptyPageProps) {
  return (
    <li className="-ml-2 flex min-h-[200px] flex-col items-center justify-center space-y-2">
      <Info className="size-8 text-primary/40" />
      <h3 className="font-space text-sm text-muted-foreground/70">{label}</h3>
    </li>
  );
}
