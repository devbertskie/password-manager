'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { formRegisterSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { notify } from '@/lib/notification';
import paths from '@/lib/paths';

type CallbackReponse = {
  error?: string;
  message?: string;
  user?: User;
};

const RegisterForm = () => {
  const router = useRouter();

  const registerForm = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const { isSubmitting } = registerForm.formState;

  const handleRegisterForm = async (
    values: z.infer<typeof formRegisterSchema>,
  ) => {
    const response: Response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    const callbackResponse: CallbackReponse = await response.json();

    if (callbackResponse.user) {
      notify.success(callbackResponse.message);
      router.push(paths.toLogin());
      router.refresh();
    } else {
      notify.error(callbackResponse.error);
    }
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handleRegisterForm)}
        className="w-96"
      >
        {/* header */}
        <div className="mb-6 flex items-center justify-center">
          <ShieldCheck className="size-10" />
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
            Create an Account
          </h1>
        </div>

        <FormField
          control={registerForm.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-2">
              {/* username */}
              <div className="mb-4 grid gap-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  {...field}
                  type="text"
                  autoCapitalize="off"
                  autoComplete="off"
                  placeholder="Enter your username"
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-2">
              {/* email */}
              <div className="mb-4 grid gap-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...field}
                  type="email"
                  autoCapitalize="off"
                  autoComplete="off"
                  placeholder="Enter your email"
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={registerForm.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-2">
              {/* password */}
              <div className="mb-6 grid gap-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit" className="w-full">
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}

          <span className={`${isSubmitting ? 'ml-2' : null}`}>
            {isSubmitting ? 'Creating Account...' : 'Register'}
          </span>
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href={paths.toLogin()} className="text-green-500 underline">
            Login instead
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
