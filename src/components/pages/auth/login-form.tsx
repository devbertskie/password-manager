'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import paths from '@/lib/paths';
import { Label } from '@radix-ui/react-label';
import { Loader2, Lock } from 'lucide-react';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { authorizeUser } from '@/actions';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import FieldError from '@/components/pages/auth/field-error';
import Wrapper from '@/components/shared/card-wrapper';
import { CardContent } from '@/components/ui/card';
import CardHeader from '@/components/shared/card-header';
import { useSearchParams } from 'next/navigation';

const LoginSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant="default"
      type="submit"
      className="w-full"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}

      <span className={`${pending ? 'ml-2' : null}`}>
        {pending ? 'Logging in...' : 'Login'}
      </span>
    </Button>
  );
};

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [formState, dispatchLoginAction] = useFormState(
    authorizeUser.bind(null, callbackUrl),
    EmptyFormState,
  );

  useFormToastMessage(formState);

  return (
    <Wrapper>
      <CardHeader Icon={Lock} title="Authenticate" label="Login to proceed" />

      <CardContent>
        <form action={dispatchLoginAction}>
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

          {/* password */}
          <div className="mb-6 grid gap-y-2">
            <Label htmlFor="password" className="add-required">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
            />
            <FieldError formState={formState} name="password" />
          </div>
          <p className="-mt-6 mb-4 text-sm text-muted-foreground">
            <Link
              href={paths.toForgotPassword()}
              className="text-primary underline"
            >
              Forgot Password?
            </Link>
          </p>

          <LoginSubmitButton />
          <p className="mt-2 text-sm text-muted-foreground">
            Not yet registered?{' '}
            <Link href={paths.toRegister()} className="text-primary underline">
              Create an account
            </Link>
          </p>
        </form>
      </CardContent>
    </Wrapper>
  );
};

export default LoginForm;
