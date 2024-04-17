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
import { webCredentialFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToggle } from 'usehooks-ts';
import { z } from 'zod';
import { addCredential } from '@/actions';
import { useSession } from 'next-auth/react';
import { notify } from '@/lib/notification';
import { useRouter } from 'next/navigation';

const WebNewForm = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [openDialog, toggleDiaglog, setOpenDialog] = useToggle(false);
  const webCredentialForm = useForm<z.infer<typeof webCredentialFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(webCredentialFormSchema),
    defaultValues: {
      title: '',
      siteUrl: '',
      usernameOrEmail: '',
      password: '',
    },
  });

  const handleAddWebCredential = async (
    values: z.infer<typeof webCredentialFormSchema>,
  ) => {
    const webCredentialResponse = await addCredential(
      values,
      session?.user.userId!,
    );
    if (webCredentialResponse?.errorMsg) {
      notify.error(webCredentialResponse.errorMsg);
      return;
    }

    if (webCredentialResponse?.webCredentialData) {
      handleCloseForm();
      notify.success(webCredentialResponse.message);
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
  } = webCredentialForm;

  return (
    <>
      <Button
        onClick={() => setOpenDialog(true)}
        className="flex items-center space-x-1 bg-primary/10 text-primary hover:bg-primary/10 hover:text-muted-foreground"
      >
        <Plus className="w-4" />
        <span> New Credential</span>
      </Button>

      <Form {...webCredentialForm}>
        <Dialog open={openDialog} onOpenChange={handleCloseForm}>
          <DialogContent
            className="top-[calc(100vh_-_70%)] sm:max-w-[425px]"
            onEscapeKeyDown={(e) => e.preventDefault()}
            // onPointerDown={(e) => e.preventDefault()}
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader className="tracking-wider">
              <DialogTitle className="font-space">
                New Web Credential
              </DialogTitle>
              <DialogDescription className="text-xs">
                All fields are required
              </DialogDescription>
            </DialogHeader>
            <Separator />

            <form
              onSubmit={webCredentialForm.handleSubmit(handleAddWebCredential)}
              className="flex flex-col space-y-4 tracking-wide text-muted-foreground/70"
            >
              <FormField
                control={webCredentialForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Label className="add-required text-sm after:ml-1">
                          Title
                        </Label>
                        <Input
                          {...field}
                          className="placeholder:text-xs"
                          placeholder="Enter title"
                          disabled={isSubmitting}
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={webCredentialForm.control}
                name="siteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Label className="add-required text-sm after:ml-1">
                          Site URL
                        </Label>
                        <Input
                          {...field}
                          className="placeholder:text-xs"
                          type="url"
                          placeholder="Enter site url"
                          disabled={isSubmitting}
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={webCredentialForm.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Label className="add-required text-sm after:ml-1">
                          Username / Email
                        </Label>
                        <Input
                          {...field}
                          className="placeholder:text-xs"
                          placeholder="Enter title"
                          disabled={isSubmitting}
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={webCredentialForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex flex-col space-y-2">
                        <Label className="add-required text-sm after:ml-1">
                          Password
                        </Label>
                        <Input
                          {...field}
                          type="password"
                          className="placeholder:text-xs"
                          placeholder="Your password"
                          disabled={isSubmitting}
                        />
                        <FormMessage />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  onClick={handleCloseForm}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
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

export default WebNewForm;
