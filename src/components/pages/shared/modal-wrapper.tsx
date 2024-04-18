'use client';
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

interface ModalWrapperProps {
  isOpen: boolean;
  children: ReactNode;
}

export default function ModalWrapper({ isOpen, children }: ModalWrapperProps) {
  const router = useRouter();
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-sm md:w-full">
        {children}

        <Button
          type="button"
          className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
          onClick={() => router.back()}
        >
          Close
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
}
