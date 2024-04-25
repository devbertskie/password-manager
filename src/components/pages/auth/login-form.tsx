'use client';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import paths from '@/lib/paths';

import { Label } from '@radix-ui/react-label';
import { Loader2, Lock } from 'lucide-react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from 'react';

import RedirectMessage from '@/components/pages/auth/redirect-message';
import { useFormState, useFormStatus } from 'react-dom';
import { authorizeUser } from '@/actions';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import FieldError from './field-error';

const LoginSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-primary/10 text-primary hover:bg-primary/5 hover:text-muted-foreground"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}

      <span className={`${pending ? 'ml-2' : null}`}>
        {pending ? 'Logging in...' : 'Login'}
      </span>
    </Button>
  );
};

const LoginForm = () => {
  const params = useSearchParams();
  const isRegistered = params.get('registered') === 'true';
  const isLogout = params.get('logout') === 'true';
  const [formState, dispatchLoginAction] = useFormState(
    authorizeUser,
    EmptyFormState,
  );

  useFormToastMessage(formState);

  return (
    <>
      {isRegistered && (
        <RedirectMessage
          type="SUCCESS"
          message="Your account was created 🎉. Please login"
        />
      )}
      {isLogout && (
        <RedirectMessage type="SUCCESS" message="Logout successfully 🎉" />
      )}

      <form
        action={dispatchLoginAction}
        className="w-96 rounded-xl border border-border p-8 shadow-xl"
      >
        {/* header */}
        <div className="mb-6 flex items-center justify-center">
          <Lock className="size-10" />
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
            Authenticate
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Login to proceed
          </p>
        </div>

        {/* email */}
        <div className="mb-4 grid gap-y-2">
          <Label htmlFor="email">Email</Label>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="******"
          />
          <FieldError formState={formState} name="password" />
        </div>

        <LoginSubmitButton />
        <p className="mt-2 text-sm text-muted-foreground">
          Not yet registered?{' '}
          <Link href={paths.toRegister()} className="text-primary underline">
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
