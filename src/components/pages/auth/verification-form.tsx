'use client';
import { verifyUserEmail } from '@/actions';
import StatusFeedback from '@/components/shared/feedback/status-feedback';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import paths from '@/lib/paths';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import { useFormState } from 'react-dom';

export default function VerificationForm() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [formState, dispatchVerify] = useFormState(
    verifyUserEmail.bind(null, token),
    EmptyFormState,
  );

  const runVerification = useCallback(() => {
    dispatchVerify();
  }, [dispatchVerify]);

  useEffect(() => {
    runVerification();
  }, [runVerification]);

  useFormToastMessage(formState);

  return (
    <Card className="w-[400px]">
      {formState.status === 'UNSET' && (
        <CardHeader className="text-center">
          <CardTitle className="text-primary">Email Confirmation</CardTitle>
          <CardDescription>Confirming you account.....</CardDescription>
        </CardHeader>
      )}
      <CardContent className="flex flex-col justify-center space-y-3 p-4">
        {formState.status === 'UNSET' && (
          <Loader2 className="mx-auto size-12 animate-spin text-primary" />
        )}

        <StatusFeedback formState={formState} />

        {(formState.status === 'SUCCESS' || formState.status === 'ERROR') && (
          <Button asChild>
            <Link href={paths.toLogin()}>Back to login</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

//
