import { Separator } from '@/components/ui/separator';
import React from 'react';
import ProfileForm from './components/profile-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import AvatarFormUpload from './components/avatar-form-upload';

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">Update your profile</p>
      </div>
      <Separator />
      <div className="flex flex-col space-y-6">
        <AvatarFormUpload />
        <ProfileForm session={session} />
      </div>
    </div>
  );
};

export default ProfilePage;
