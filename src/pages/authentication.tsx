import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import React from 'react';

const AuthenticationPage = () => {
  return (
    <div className="flex size-full items-center justify-center">
      {/* form login */}
      <form className="w-96">
        {/* header */}
        <div className="mb-6 flex items-center justify-center">
          <Lock className="size-10" />
        </div>

        <div className="mb-6 flex flex-col items-center">
          <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
            Secure Access to Your Passwords
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Safeguarding your passwords has never been easier. Just enter your
            email and master password to access your encrypted vault. Your
            existing encrypted file will be unlocked, or a new one will be
            created if it doesn't exist.
          </p>
        </div>

        {/* email */}
        <div className="mb-4 grid gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
            required={true}
            placeholder="Enter your email"
          />
        </div>
        {/* password */}
        <div className="mb-6 grid gap-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoCapitalize="none"
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
            required={true}
            placeholder="Enter your password"
          />
        </div>
        <Button className="w-full">Continue</Button>
      </form>
    </div>
  );
};

export default AuthenticationPage;
