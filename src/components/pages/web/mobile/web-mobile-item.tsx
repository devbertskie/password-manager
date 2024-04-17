import { WebCredential } from '@prisma/client';
import { GlobeIcon, Star } from 'lucide-react';
import React from 'react';

interface WebMobileItemProps {
  webCredential: WebCredential;
}

export default function WebMobileItem({ webCredential }: WebMobileItemProps) {
  return (
    <div className="flex items-center space-x-2 ">
      <GlobeIcon className="text-primary" />
      <div className="ml-2 flex-1 space-y-1 tracking-wider text-muted-foreground">
        <h3 className="font-space text-[16px] text-primary">
          Title here for so olng
        </h3>
        <p className="text-xs">Lorem ipsum dolor sit amet.</p>
      </div>
      <Star />
    </div>
  );
}
