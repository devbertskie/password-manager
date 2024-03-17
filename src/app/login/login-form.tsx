'use client';

import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { notify } from '@/lib/notification';
import paths from '@/lib/paths';
import { formLoginSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { Loader2, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const LoginForm = () => {
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleLoginForm = async (values: z.infer<typeof formLoginSchema>) => {
    const userSession = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (userSession?.error) {
      notify.error(userSession.error);
    } else {
      notify.success('Authenticated!');
      router.push(paths.toDashboard());
      router.refresh();
    }
  };

  const { isSubmitting } = loginForm.formState;

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(handleLoginForm)} className="w-96">
        {/* header */}
        <div className="mb-6 flex items-center justify-center">
          <Lock className="size-10" />
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
            Secure Access to Your Passwords
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Safeguarding your passwords has never been easier. Just enter your
            email and master password to access your encrypted vault.
          </p>
        </div>

        <FormField
          control={loginForm.control}
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
          control={loginForm.control}
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
            {isSubmitting ? 'Logging in...' : 'Login'}
          </span>
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">
          Not yet registered?{' '}
          <Link href={paths.toRegister()} className="text-green-500 underline">
            Create an account
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
