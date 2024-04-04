'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import paths from '@/lib/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUpload } from 'lucide-react';
import { Session } from 'next-auth';
import Link from 'next/link';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface ProfileFormProps {
  session: Session | null;
}

const MAX_IMAGE_SIZE = 5245880;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const profileFormSchema = z.object({
  username: z.string().min(6, { message: 'Min at least 6 characters' }),
  email: z.string().email('Invalid Email'),
  imageUrl: z
    .custom<FileList>((f) => f instanceof FileList, 'Required')
    .refine((files) => files.length !== 0, `File is Required!`)
    .refine((files) => files.length <= 1, `Only one image allowed.`)
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
      `File size should be less than 5 MB`,
    )
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_IMAGE_TYPES.includes(file.type),
        ),
      `Only these types are allowed .jpg .png .jpeg`,
    ),
});

const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => {
    dataTransfer.items.add(image);
  });

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
};

const ProfileForm = ({ session }: ProfileFormProps) => {
  const [previewUrl, setPreviewUrl] = useState(session?.user.image);
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      imageUrl: undefined,
      username: session?.user.username,
      email: session?.user.email!,
    },
  });

  const handleUpdateProfile = async (
    value: z.infer<typeof profileFormSchema>,
  ) => {
    console.log(value);
  };

  return (
    <Form {...profileForm}>
      <form
        onSubmit={profileForm.handleSubmit(handleUpdateProfile)}
        className="flex flex-col space-y-6"
      >
        {/* profile pic */}
        <div className="mx-2 flex items-center space-x-4">
          <Avatar className="size-16">
            <AvatarImage
              className="object-cover"
              src={previewUrl || 'https://github.com/shadcn.png'}
              alt="profile"
            />
            <AvatarFallback>HB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-3">
            <div>
              <h3 className="font-space text-sm tracking-wider">
                Update Profile Picture
              </h3>
              <p className="text-xs text-muted-foreground">
                Allowed image type: .jpeg | .png | .jpg Max: 5MB
              </p>
            </div>
            <FormField
              control={profileForm.control}
              name="imageUrl"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Label
                          htmlFor="upload-file"
                          className="transition-300 group flex items-center rounded-md bg-primary/10 px-4 py-3 text-primary hover:bg-primary/15 hover:text-foreground"
                        >
                          <CloudUpload className="transition-300 mr-2 size-4 group-hover:text-foreground" />
                          <span>Select</span>
                          <Input
                            {...rest}
                            type="file"
                            className="hidden"
                            id="upload-file"
                            onChange={(event) => {
                              const { files, displayUrl } = getImageData(event);
                              setPreviewUrl(displayUrl);
                              onChange(files);
                            }}
                          />
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
        </div>
        {/* end profile pic */}
        {/* username */}
        <FormField
          control={profileForm.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <div className="flex flex-col space-y-4">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      {...field}
                      type="text"
                      id="username"
                      autoComplete="off"
                      placeholder="Enter your username"
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...field}
                    type="text"
                    id="email"
                    autoComplete="off"
                    placeholder="Enter your email address"
                  />
                  <FormMessage />
                </div>
              </FormItem>
            </>
          )}
        />

        <div className="flex items-center space-x-3 self-end ">
          <Button variant="outline" asChild>
            <Link href={paths.toDashboard()}>Cancel</Link>
          </Button>
          <Button
            type="submit"
            className="bg-primary/10 text-primary hover:bg-primary/15 hover:text-foreground"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
