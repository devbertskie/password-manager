'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
import { noteFormSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Note } from '@prisma/client';
import { FileText, Loader2 } from 'lucide-react';
import TipTapEditor from './tiptap-editor';
import { updateNote } from '@/actions';
import paths from '@/lib/paths';

interface NotePreviewProps {
  isEditable: boolean;
  onCancelEditable: () => void;
  noteData: Note;
}

const NotePreview = ({
  isEditable,
  onCancelEditable,
  noteData,
}: NotePreviewProps) => {
  const router = useRouter();

  const updateForm = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      title: noteData.title,
      content: JSON.stringify(noteData.content),
    },
  });

  const onUpdateForm = async (values: z.infer<typeof noteFormSchema>) => {
    const updatedNote = await updateNote(values, noteData.id);
    if (updatedNote) {
      notify.success('Credential updated');
      router.push(paths.toNoteItem(updatedNote.id));
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col space-y-2">
                  <FormLabel
                    className={cn(isEditable && 'add-required', 'text-xs')}
                  >
                    Note
                  </FormLabel>
                  {/* <div className="relative">
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
                  </div> */}
                  <TipTapEditor
                    isEditable={isEditable}
                    content={field.value}
                    onChange={field.onChange}
                  />
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

export default NotePreview;
