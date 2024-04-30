import { Info } from 'lucide-react';
import React from 'react';

interface PreviewPlaceholderProps {
  label: string;
}

export default function PreviewPlaceholder({ label }: PreviewPlaceholderProps) {
  return (
    <div className="hidden flex-col items-center justify-center space-y-3 md:flex">
      <Info className="size-16 text-primary/40 opacity-70" />
      <h1 className="font-space text-sm text-muted-foreground/70">{label}</h1>
    </div>
  );
}
