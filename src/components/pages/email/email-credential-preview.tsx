'use client';

import React, { useEffect } from 'react';
import { updateEmailCredentialById } from '@/actions';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCopyToClipboard, useToggle } from 'usehooks-ts';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { notify } from '@/lib/notification';
import { emailCredentialFormSchema } from '@/lib/schema';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailCredential } from '@prisma/client';
import Crypto from 'crypto-js';
import {
  CheckCheck,
  Copy,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Loader2,
  Lock,
  Mail,
  SquareArrowUpRight,
} from 'lucide-react';
import paths from '@/lib/paths';

interface EmailCredentialPreviewProps {
  isEditable: boolean;
  onCancelEditable: () => void;
  emailCredential: EmailCredential;
}

const EmailCredentialPreview = ({
  isEditable,
  onCancelEditable,
  emailCredential,
}: EmailCredentialPreviewProps) => {
  const SALT_KEY = process.env.saltKey!;
  const [showPassword, toggleShowPassword] = useToggle(false);
  const router = useRouter();
  const [copiedUrl, copyUrl] = useCopyToClipboard();
  const [copiedEmail, copyEmail] = useCopyToClipboard();
  const [copiedPassword, copyPassword] = useCopyToClipboard();

  const decryptedEmail = Crypto.AES.decrypt(
    emailCredential?.usernameOrEmail,
    SALT_KEY,
  ).toString(Crypto.enc.Utf8);

  const decryptedPassword = Crypto.AES.decrypt(
    emailCredential?.password,
    SALT_KEY,
  ).toString(Crypto.enc.Utf8);

  const updateForm = useForm<z.infer<typeof emailCredentialFormSchema>>({
    resolver: zodResolver(emailCredentialFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: decryptedEmail,
      password: decryptedPassword,
      title: emailCredential.title,
      siteUrl: emailCredential.siteUrl,
    },
  });

  const onUpdateForm = async (
    values: z.infer<typeof emailCredentialFormSchema>,
  ) => {
    const updateResponse = await updateEmailCredentialById(
      values,
      emailCredential.id,
    );
    if (updateResponse) {
      notify.success('Credential updated');
      router.push(paths.toEmailItem(updateResponse.id));
      router.refresh();
    }
  };

  const {
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    reset,
    getValues,
    clearErrors,
  } = updateForm;

  useEffect(() => {
    if (!isEditable && !isSubmitSuccessful) {
      reset();
      clearErrors();
    }
  }, [isEditable, clearErrors, reset, isSubmitSuccessful]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
      onCancelEditable();
    }
  }, [getValues, isSubmitSuccessful, onCancelEditable, reset]);

  return (
    <Form {...updateForm}>
      <form
        onSubmit={updateForm.handleSubmit(onUpdateForm)}
        className="mt-4 flex flex-col space-y-6"
      >
        <FormField
          control={updateForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <FormLabel
                    className={cn(isEditable && 'add-required', 'text-xs')}
                  >
                    Title
                  </FormLabel>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
                      <FileText className="size-4" />
                    </div>
                    <Input
                      {...field}
                      type="text"
                      className={cn(
                        !isEditable && 'focus-visible:ring-0',
                        'pl-10 truncate pr-16',
                      )}
                      readOnly={!isEditable}
                      disabled={isSubmitting}
                    />
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={updateForm.control}
          name="siteUrl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <FormLabel
                    className={cn(isEditable && 'add-required', 'text-xs')}
                  >
                    Site URL
                  </FormLabel>
                  <div className="relative">
                    {!isEditable && (
                      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
                        <a href={`${emailCredential.siteUrl}`} target="_blank">
                          <SquareArrowUpRight className="size-4" />
                        </a>
                        {copiedUrl ? (
                          <CheckCheck className="transition-300 size-4 text-green-400" />
                        ) : (
                          <Copy
                            className="size-4"
                            onClick={async () =>
                              copyUrl(emailCredential?.siteUrl || '')
                            }
                          />
                        )}
                      </div>
                    )}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
                      <Globe className="size-4" />
                    </div>
                    <Input
                      {...field}
                      type="url"
                      className={cn(
                        !isEditable && 'focus-visible:ring-0',
                        'pl-10 truncate pr-16 ',
                      )}
                      readOnly={!isEditable}
                      disabled={isSubmitting}
                    />
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={updateForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <FormLabel
                    htmlFor="email"
                    className={cn(isEditable && 'add-required', 'text-xs')}
                  >
                    Email
                  </FormLabel>
                  <div className="relative">
                    {!isEditable && (
                      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
                        {copiedEmail ? (
                          <CheckCheck className="transition-300 size-4 text-green-400" />
                        ) : (
                          <Copy
                            className="size-4"
                            onClick={async () => copyEmail(decryptedEmail)}
                          />
                        )}
                      </div>
                    )}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
                      <Mail className="size-4" />
                    </div>
                    <Input
                      {...field}
                      id="emal"
                      type="email"
                      className={cn(
                        !isEditable && 'focus-visible:ring-0',
                        'pl-10 truncate pr-16',
                      )}
                      readOnly={!isEditable}
                      disabled={isSubmitting}
                    />
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={updateForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <FormLabel
                    className={cn(isEditable && 'add-required', 'text-xs')}
                  >
                    Password
                  </FormLabel>
                  <div className="relative">
                    {!isEditable && (
                      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
                        {showPassword ? (
                          <EyeOff
                            onClick={toggleShowPassword}
                            className="size-4"
                          />
                        ) : (
                          <Eye
                            onClick={toggleShowPassword}
                            className="size-4"
                          />
                        )}
                        {copiedPassword ? (
                          <CheckCheck className="transition-300 size-4 text-green-400" />
                        ) : (
                          <Copy
                            className="size-4"
                            onClick={async () =>
                              copyPassword(decryptedPassword)
                            }
                          />
                        )}
                      </div>
                    )}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
                      <Lock className="size-4" />
                    </div>
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      className={cn(
                        !isEditable && 'focus-visible:ring-0',
                        'pl-10 truncate pr-14',
                      )}
                      readOnly={!isEditable}
                      disabled={isSubmitting}
                    />
                  </div>
                  <FormMessage />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        {isEditable && (
          <div className="flex items-center space-x-3 self-end">
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={onCancelEditable}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting && <Loader2 className="size-4 animate-spin" />}
              <span className={`${isSubmitting ? 'ml-2' : null}`}>
                {isSubmitting ? 'Updating...' : 'Update Credential'}
              </span>
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EmailCredentialPreview;
