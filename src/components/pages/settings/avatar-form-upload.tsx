'use client';
import { updateProfileImage } from '@/actions';
import AvatarProfile from '@/components/shared/avatar-profile';
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
import { ALLOWED_IMAGE_TYPES } from '@/constants';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useEdgeStore } from '@/lib/edgestore';
import { notify } from '@/lib/notification';
import { avatarUploadSchema } from '@/lib/schema';
import { cn } from '@/lib/utils';

import { zodResolver } from '@hookform/resolvers/zod';
import { CloudUploadIcon, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) => {
    dataTransfer.items.add(image);
  });

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);
  return { files, displayUrl };
};

const AvatarFormUpload = () => {
  const { edgestore } = useEdgeStore();
  const currentUser = useCurrentUser();
  const { update } = useSession();
  const [previewUrl, setPreviewUrl] = useState(currentUser?.image);

  const avatarForm = useForm<z.infer<typeof avatarUploadSchema>>({
    mode: 'onSubmit',
    resolver: zodResolver(avatarUploadSchema),
    defaultValues: {
      imageUrl: undefined,
    },
  });

  const handleUploadProfile = async (file: File) => {
    const { url } = await edgestore.userProfileImages.upload({
      file,
      options: {
        replaceTargetUrl: '',
      },
    });
    if (url) {
      const result = await updateProfileImage(url);
      if (result.imageUrl) {
        update({
          user: {
            ...currentUser,
            image: result.imageUrl,
          },
        });
        notify.success('Image updated');
      }
    }
  };

  const handleUploadSubmit = async (
    value: z.infer<typeof avatarUploadSchema>,
  ) => {
    const file = value.imageUrl[0];
    await handleUploadProfile(file);
  };

  const {
    formState: { isSubmitting, isDirty },
  } = avatarForm;
  return (
    <Form {...avatarForm}>
      <form onSubmit={avatarForm.handleSubmit(handleUploadSubmit)}>
        <FormField
          control={avatarForm.control}
          name="imageUrl"
          render={({ field: { onChange, value, ...rest } }) => (
            <div className="mx-2 flex items-center space-x-4">
              <FormItem>
                <FormControl>
                  <div className="">
                    <Label htmlFor="upload-file" className="relative">
                      <div
                        className={cn(
                          isSubmitting ? 'flex' : 'hidden',
                          'absolute inset-0 z-20 items-center justify-center rounded-full bg-black/80',
                        )}
                      >
                        <Loader2 className="size-4 animate-spin" />
                      </div>
                      <AvatarProfile
                        imageSrc={previewUrl || ''}
                        className="z-10 size-16 lg:size-20"
                      />
                      <Input
                        {...rest}
                        type="file"
                        className="hidden"
                        accept={ALLOWED_IMAGE_TYPES.join(', ')}
                        id="upload-file"
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreviewUrl(displayUrl);
                          onChange(files);
                        }}
                        disabled={isSubmitting}
                      />
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
              <div className="flex flex-col space-y-3">
                <div>
                  <h3 className="font-space text-sm tracking-wider">
                    Update Profile Picture
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Allowed image type: .jpeg | .png | .jpg Max: 4MB
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    disabled={!isDirty || isSubmitting}
                    type="submit"
                    size="sm"
                    className="transition-300 group flex items-center rounded-md"
                  >
                    {isSubmitting ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <CloudUploadIcon className="transition-300 mr-2 size-4 group-hover:text-foreground" />
                    )}

                    <span className={`${isSubmitting ? 'ml-2' : null}`}>
                      {isSubmitting ? 'Updating...' : 'Update Image'}
                    </span>
                  </Button>
                </div>
                <FormMessage />
              </div>
            </div>
          )}
        />
      </form>
    </Form>
  );
};

export default AvatarFormUpload;
