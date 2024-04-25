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

const RegisterButtonSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      className="w-full bg-primary/10 text-primary hover:bg-primary/5 hover:text-muted-foreground"
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
    <form
      action={dispatchRegisterUserAction}
      className="w-96 rounded-xl border border-border p-8 shadow-xl"
    >
      {/* header */}
      <div className="mb-6 flex items-center justify-center">
        <ShieldCheck className="size-10" />
      </div>

      <div className="mb-6 flex flex-col items-center">
        <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
          Create an Account
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Signup to get started
        </p>
      </div>

      {/* username */}
      <div className="mb-4 grid gap-y-2">
        <Label htmlFor="username">Username</Label>
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
        <Label htmlFor="email">Email</Label>
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
        <Label htmlFor="password">Password</Label>
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
  );
};

export default RegisterForm;
