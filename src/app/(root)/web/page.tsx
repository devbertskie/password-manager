import { Info } from 'lucide-react';
import React from 'react';

const WebCredentialsPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-3">
      <Info className="size-16 text-primary/40" />
      <h1 className="font-space text-xl leading-4 text-muted-foreground/70">
        Please select credential to preview!
      </h1>
    </div>
  );
};

export default WebCredentialsPage;
