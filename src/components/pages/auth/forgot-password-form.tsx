'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Loader2, RectangleEllipsis } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import FieldError from '@/components/pages/auth/field-error';
import Wrapper from '@/components/shared/card-wrapper';
import CardHeader from '@/components/shared/card-header';
import { CardContent } from '@/components/ui/card';
import { forgotPassword } from '@/actions';
import Link from 'next/link';
import paths from '@/lib/paths';

const ForgotSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" className="w-full" disabled={pending} asChild>
        <Link href={paths.toLogin()}>Cancel</Link>
      </Button>
      <Button
        disabled={pending}
        variant="default"
        type="submit"
        className="w-full"
      >
        {pending && <Loader2 className="size-4 animate-spin" />}

        <span className={`${pending ? 'ml-2' : null}`}>
          {pending ? 'Checking...' : 'Submit'}
        </span>
      </Button>
    </div>
  );
};

const ForgotPasswordForm = () => {
  const [formState, dispatchForgotPasswordAction] = useFormState(
    forgotPassword,
    EmptyFormState,
  );

  useFormToastMessage(formState);

  return (
    <Wrapper>
      <CardHeader
        Icon={RectangleEllipsis}
        title="Forgot Password"
        label="Enter your email to proceed"
      />

      <CardContent>
        <form action={dispatchForgotPasswordAction}>
          {/* email */}
          <div className="mb-4 grid gap-y-2">
            <Label htmlFor="email" className="add-required">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoCapitalize="off"
              autoComplete="off"
              placeholder="Enter your email"
            />
            <FieldError formState={formState} name="email" />
          </div>

          <ForgotSubmitButton />
        </form>
      </CardContent>
    </Wrapper>
  );
};

export default ForgotPasswordForm;
