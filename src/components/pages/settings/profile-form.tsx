'use client';
import { updateProfile } from '@/actions';
import { ExtendedUser } from '@/auth';
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
import { profileFormSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ProfileFormProps {
  currentUser: ExtendedUser | null;
}

const ProfileForm = ({ currentUser }: ProfileFormProps) => {
  const { update } = useSession();
  const router = useRouter();
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: currentUser?.username || undefined,
      email: currentUser?.email || undefined,
    },
  });

  const {
    formState: { isSubmitting, isDirty, isSubmitSuccessful },
    getValues,
    reset,
  } = profileForm;

  const handleUpdateProfile = async (
    values: z.infer<typeof profileFormSchema>,
  ) => {
    const updatedUserData = await updateProfile(values);
    if (updatedUserData) {
      if (updatedUserData.emailVerified) {
        update({
          user: {
            ...currentUser,
            username: updatedUserData.username,
          },
        });
        router.refresh();
        notify.success('Profile updated!');
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
  }, [getValues, reset, isSubmitSuccessful]);

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
        className="flex flex-col space-y-6"
      >
        <FormField
          control={profileForm.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="username" className="add-required">
                      Username{' '}
                    </Label>
                    <Input
                      {...field}
                      type="text"
                      id="username"
                      autoComplete="off"
                      placeholder="Enter your username"
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
          control={profileForm.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <div className="mb-6 flex flex-col space-y-4">
                  {/* email */}
                  <Label htmlFor="email" className="add-required">
                    Email
                  </Label>
                  <Input
                    {...field}
                    type="text"
                    id="email"
                    autoComplete="off"
                    placeholder="Enter your email address"
                    disabled={isSubmitting}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            </>
          )}
        />

        <div className="flex items-center space-x-3 self-end ">
          <Button variant="outline" disabled={isSubmitting} asChild>
            <Link href={paths.toDashboard()}>Cancel</Link>
          </Button>
          <Button type="submit" disabled={!isDirty || isSubmitting}>
            {isSubmitting && <Loader2 className="size-4 animate-spin" />}

            <span className={`${isSubmitting ? 'ml-2' : null}`}>
              {isSubmitting ? 'Updating...' : 'Save Profile'}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
