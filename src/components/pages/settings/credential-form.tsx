'use client';
import { changePassword } from '@/actions';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { notify } from '@/lib/notification';
import paths from '@/lib/paths';
import { credentialFormSchema } from '@/lib/schema';
import { logOut } from '@/lib/sign-out';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CredentialFormProps {
  session: Session | null;
}

const CredentialForm = ({ session }: CredentialFormProps) => {
  const credentialForm = useForm<z.infer<typeof credentialFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(credentialFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleUpdateCredential = async (
    values: z.infer<typeof credentialFormSchema>,
  ) => {
    const userResponseData = await changePassword(values, session?.user.email!);
    if (userResponseData?.errorMsg) {
      notify.error(userResponseData.errorMsg);
    } else {
      if (userResponseData?.userData) {
        notify.success(userResponseData.message);
        await logOut();
      }
    }
  };

  const {
    formState: { isSubmitting },
  } = credentialForm;
  return (
    <Form {...credentialForm}>
      <form
        onSubmit={credentialForm.handleSubmit(handleUpdateCredential)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={credentialForm.control}
          name="currentPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="current-password">
                      Current Password{' '}
                      <span className="ml-1 text-red-500">*</span>{' '}
                    </Label>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter current password"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            </>
          )}
        />

        <FormField
          control={credentialForm.control}
          name="newPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="current-password">
                      New Password <span className="ml-1 text-red-500">*</span>{' '}
                    </Label>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter new password"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            </>
          )}
        />
        <FormField
          control={credentialForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="current-password">
                      Confirm Password{' '}
                      <span className="ml-1 text-red-500">*</span>{' '}
                    </Label>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm new password"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    <FormMessage />
                  </div>
                </FormControl>
              </FormItem>
            </>
          )}
        />

        <div className="flex items-center space-x-3 self-end">
          <Button variant="outline" disabled={isSubmitting} asChild>
            <Link href={paths.toDashboard()}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}

            <span className={`${isSubmitting ? 'ml-2' : null}`}>
              {isSubmitting ? 'Updating...' : 'Update Credential'}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CredentialForm;