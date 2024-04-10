'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import {
  CheckCheck,
  Contact,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Lock,
  SquareArrowUpRight,
} from 'lucide-react';
import React from 'react';
import { useCopyToClipboard, useToggle } from 'usehooks-ts';

interface WebCredentialPreviewProps {
  isEditable: boolean;
  onCancelEditable: () => void;
}

const WebCredentialPreview = ({
  isEditable,
  onCancelEditable,
}: WebCredentialPreviewProps) => {
  const [showPassword, toggleShowPassword] = useToggle(false);

  const [copiedUrl, copyUrl] = useCopyToClipboard();
  const [copiedUsername, copyUsername] = useCopyToClipboard();
  const [copiedPassword, copyPassword] = useCopyToClipboard();

  return (
    <form className="mt-4 flex flex-col space-y-6">
      <div className="flex flex-col space-y-2">
        <Label className="text-xs">Site URL</Label>
        <div className="relative">
          {!isEditable && (
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
              <SquareArrowUpRight
                onClick={() => console.log('click')}
                className="size-4"
              />
              {copiedUrl ? (
                <CheckCheck className="transition-300 size-4 text-green-400" />
              ) : (
                <Copy
                  className="size-4"
                  onClick={async () => copyUrl('Berto')}
                />
              )}
            </div>
          )}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
            <Globe className="size-4" />
          </div>
          <Input
            type="url"
            className={cn(!isEditable && 'focus-visible:ring-0', 'pl-10')}
            readOnly={!isEditable}
            value="www.google.com"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-xs">Username / Email</Label>
        <div className="relative">
          {!isEditable && (
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
              {copiedUsername ? (
                <CheckCheck className="transition-300 size-4 text-green-400" />
              ) : (
                <Copy
                  className="size-4"
                  onClick={async () => copyUsername('Berto')}
                />
              )}
            </div>
          )}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
            <Contact className="size-4" />
          </div>
          <Input
            type="text"
            className={cn(!isEditable && 'focus-visible:ring-0', 'pl-10')}
            readOnly={!isEditable}
            value="berto3231"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <Label className="text-xs">Password</Label>
        <div className="relative">
          {!isEditable && (
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
              {showPassword ? (
                <EyeOff onClick={toggleShowPassword} className="size-4" />
              ) : (
                <Eye onClick={toggleShowPassword} className="size-4" />
              )}
              {copiedPassword ? (
                <CheckCheck className="transition-300 size-4 text-green-400" />
              ) : (
                <Copy
                  className="size-4"
                  onClick={async () => copyPassword('Berto')}
                />
              )}
            </div>
          )}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
            <Lock className="size-4" />
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            className={cn(!isEditable && 'focus-visible:ring-0', 'pl-10')}
            readOnly={!isEditable}
            value="prince3231"
          />
        </div>
      </div>
      {isEditable && (
        <div className="flex items-center space-x-3 self-end">
          <Button variant="outline" onClick={onCancelEditable}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
            // disabled={isSubmitting}
          >
            {/* {isSubmitting && <Loader2 className="size-4 animate-spin" />}

            <span className={`${isSubmitting ? 'ml-2' : null}`}>
              {isSubmitting ? 'Updating...' : 'Update Credential'}
            </span> */}
            Update
          </Button>
        </div>
      )}
    </form>
  );
};

export default WebCredentialPreview;
