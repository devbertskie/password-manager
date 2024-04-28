'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import paths from '@/lib/paths';
import { registerUser } from '@/actions';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';
import FieldError from '@/components/pages/auth/field-error';
import CardHeader from '@/components/shared/card-header';
import Wrapper from '@/components/shared/card-wrapper';
import { CardContent } from '@/components/ui/card';

const RegisterButtonSubmit = () => {
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
        {pending ? 'Creating Account...' : 'Register'}
      </span>
    </Button>
  );
};

const RegisterForm = () => {
  const [formState, dispatchRegisterUserAction] = useFormState(
    registerUser,
    EmptyFormState,
  );

  useFormToastMessage(formState);
  return (
    <Wrapper>
      <CardHeader
        Icon={ShieldCheck}
        title="Create an Account"
        label="Sign up to get started"
      />

      <CardContent>
        <form action={dispatchRegisterUserAction}>
          {/* username */}
          <div className="mb-4 grid gap-y-2">
            <Label htmlFor="username" className="add-required">
              Username
            </Label>
            <Input
              name="username"
              id="username"
              type="text"
              autoCapitalize="off"
              autoComplete="off"
              placeholder="Enter your username"
            />
            <FieldError formState={formState} name="username" />
          </div>

          {/* email */}
          <div className="mb-4 grid gap-y-2">
            <Label htmlFor="email" className="add-required">
              Email
            </Label>
            <Input
              name="email"
              id="email"
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
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
            <FieldError formState={formState} name="password" />
          </div>

          <RegisterButtonSubmit />
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href={paths.toLogin()} className="text-primary underline">
              Login instead
            </Link>
          </p>
        </form>
      </CardContent>
    </Wrapper>
  );
};

export default RegisterForm;
