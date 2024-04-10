// import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import React from 'react';

const WebListItem = () => {
  return (
    <li className="transition-300 group cursor-pointer rounded-sm border-l border-l-primary bg-primary/10 px-4 py-3 text-muted-foreground/70 hover:bg-primary/20">
      <div className="flex items-center space-x-4">
        <Globe className="transition-300 size-5 group-hover:text-primary" />
        <div className="flex flex-1 flex-col space-y-0.5">
          <h3 className="transition-300 font-space text-sm tracking-wider text-primary/60 group-hover:text-primary">
            Netizion Forum
          </h3>
          <p className="transition-300 text-xs group-hover:text-muted-foreground">
            www.netizion.com
          </p>
        </div>

        {/* <Badge
          variant="secondary"
          className="self-start align-baseline text-[10px] tracking-wider text-green-400"
        >
          Web
        </Badge> */}
      </div>
    </li>
  );
};

export default WebListItem;
