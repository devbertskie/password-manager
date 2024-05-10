'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { noteFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';
import { z } from 'zod';
import { notify } from '@/lib/notification';
import { notFound, useRouter } from 'next/navigation';
import { Switch } from '@/components/ui/switch';
import paths from '@/lib/paths';
import TipTapEditor from '@/components/pages/note/tiptap-editor';
import { addNote } from '@/actions';

const NoteNewForm = () => {
  const router = useRouter();

  // eslint-disable-next-line no-unused-vars
  const [openDialog, toggleDiaglog, setOpenDialog] = useToggle(false);
  const noteForm = useForm<z.infer<typeof noteFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: '',
      content: '',
    } as any,
  });

  const handleAddNote = async (values: z.infer<typeof noteFormSchema>) => {
    const noteData = await addNote(values);
    if (!noteData) {
      return notFound();
    }
    if (noteData) {
      handleCloseForm();
      notify.success('New note added');
      router.push(paths.toNoteItem(noteData.id));
      router.refresh();
    }
  };

  const handleCloseForm = () => {
    clearErrors();
    reset();
    setOpenDialog(false);
  };

  const {
    formState: { isSubmitting },
    clearErrors,
    reset,
  } = noteForm;

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        className="flex items-center space-x-1"
      >
        <Plus className="w-4" />
        <span> Add Note</span>
      </Button>

      <Form {...noteForm}>
        <Dialog open={openDialog} onOpenChange={handleCloseForm}>
          <DialogContent
            className="top-[calc(100vh_-_60%)] max-w-md sm:top-[calc(100vh_-_70%)] md:max-w-lg"
            onEscapeKeyDown={(e) => e.preventDefault()}
            // onPointerDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader className="tracking-wider">
              <DialogTitle className="font-space">New Note</DialogTitle>
              <DialogDescription className="text-xs">
                All fields are required
              </DialogDescription>
            </DialogHeader>
            <Separator />

            <form
              onSubmit={noteForm.handleSubmit(handleAddNote)}
              className="flex flex-col space-y-4 tracking-wide text-muted-foreground/70"
            >
              <FormField
                control={noteForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Label className="add-required text-sm">Title</Label>
                        <Input
                          {...field}
                          className="placeholder:text-muted-foreground/60"
                          placeholder="A note title"
                          disabled={isSubmitting}
                        />
                        <FormMessage className="text-[10px] sm:text-sm" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={noteForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      {/* Tiptap component */}
                      <div className="flex flex-col space-y-2">
                        <Label className="add-required text-sm">Note</Label>
                        <TipTapEditor
                          isEditable
                          content={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage className="text-[10px] sm:text-sm" />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={noteForm.control}
                name="isImportant"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="mark-important"
                        />
                        <Label htmlFor="mark-important">
                          Mark as Important
                        </Label>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="flex flex-col items-stretch gap-y-3  md:flex-row md:items-center md:gap-x-2 md:gap-y-0 md:space-y-0">
                <Button
                  type="button"
                  onClick={handleCloseForm}
                  variant="outline"
                  disabled={isSubmitting}
                  className="md:order-first"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="order-first"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <Loader2 className="size-4 animate-spin" />}
                  <span className={`${isSubmitting ? 'ml-2' : null}`}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </span>
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
};

export default NoteNewForm;
