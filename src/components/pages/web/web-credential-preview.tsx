'use client';

import { updateCredentialById } from '@/actions';
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
import { webCredentialFormSchema } from '@/lib/schema';

import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { WebCredential } from '@prisma/client';
import * as Crypto from 'crypto-js';
import {
  CheckCheck,
  Contact,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Lock,
  SquareArrowUpRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCopyToClipboard, useToggle } from 'usehooks-ts';
import { z } from 'zod';

interface WebCredentialPreviewProps {
  isEditable: boolean;
  onCancelEditable: () => void;
  webCredential: WebCredential;
}

const WebCredentialPreview = ({
  isEditable,
  onCancelEditable,
  webCredential,
}: WebCredentialPreviewProps) => {
  const SALT_KEY = process.env.saltKey!;
  const [showPassword, toggleShowPassword] = useToggle(false);
  const router = useRouter();
  const [copiedUrl, copyUrl] = useCopyToClipboard();
  const [copiedUsername, copyUsername] = useCopyToClipboard();
  const [copiedPassword, copyPassword] = useCopyToClipboard();

  // if (!webCredential || !SALT_KEY) {
  //   return notFound();
  // }
  const decryptedUsernameOrEmail = Crypto.AES.decrypt(
    webCredential?.user_email,
    SALT_KEY,
  ).toString(Crypto.enc.Utf8);

  const decryptedPassword = Crypto.AES.decrypt(
    webCredential?.password,
    SALT_KEY,
  ).toString(Crypto.enc.Utf8);

  const updateForm = useForm<z.infer<typeof webCredentialFormSchema>>({
    resolver: zodResolver(webCredentialFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      usernameOrEmail: decryptedUsernameOrEmail,
      password: decryptedPassword,
      title: webCredential.title,
      siteUrl: webCredential.site_url,
    },
  });

  const onUpdateForm = async (
    values: z.infer<typeof webCredentialFormSchema>,
  ) => {
    const updateResponse = await updateCredentialById(values, webCredential.id);
    if (updateResponse?.errorMsg) {
      notify.error(updateResponse.errorMsg);
    }

    if (updateResponse?.webCredentialData && updateResponse.message) {
      notify.success(updateResponse.message);
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
                  <FormLabel className="text-xs">Title</FormLabel>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
                      <Globe className="size-4" />
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
                  <FormLabel className="text-xs">Site URL</FormLabel>
                  <div className="relative">
                    {!isEditable && (
                      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
                        <SquareArrowUpRight
                          onClick={() => console.log('click')}
                          className="size-4"
                        />
                        {copiedUrl ? (
                          <CheckCheck className="transition-300 size-4 text-green-400" />
                        ) : (
                          <Copy
                            className="size-4"
                            onClick={async () =>
                              copyUrl(webCredential?.site_url || '')
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
          name="usernameOrEmail"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <FormLabel className="text-xs">Username / Email</FormLabel>
                  <div className="relative">
                    {!isEditable && (
                      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center space-x-2">
                        {copiedUsername ? (
                          <CheckCheck className="transition-300 size-4 text-green-400" />
                        ) : (
                          <Copy
                            className="size-4"
                            onClick={async () =>
                              copyUsername(decryptedUsernameOrEmail)
                            }
                          />
                        )}
                      </div>
                    )}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70">
                      <Contact className="size-4" />
                    </div>
                    <Input
                      {...field}
                      type="text"
                      className={cn(
                        !isEditable && 'focus-visible:ring-0',
                        'pl-10',
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
                  <FormLabel className="text-xs">Password</FormLabel>
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
                        'pl-10',
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
            <Button variant="outline" onClick={onCancelEditable}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
              disabled={isSubmitting || !isDirty}
            >
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

export default WebCredentialPreview;
