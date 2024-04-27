'use client';
import CardHeader from '@/components/shared/card-header';
import Wrapper from '@/components/shared/card-wrapper';
import { CardContent } from '@/components/ui/card';
import { Loader2, RectangleEllipsis } from 'lucide-react';
import React from 'react';
import FieldError from '@/components/pages/auth/field-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { resetPassword } from '@/actions';
import { useSearchParams } from 'next/navigation';
import { EmptyFormState } from '@/helpers/from-errors-to-formstate';
import { useFormToastMessage } from '@/hooks/use-form-toast-message';

const ResetSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant="default"
      type="submit"
      className="w-full"
    >
      {pending && <Loader2 className="size-4 animate-spin" />}

      <span className={`${pending ? 'ml-2' : null}`}>
        {pending ? 'Resetting...' : 'Reset'}
      </span>
    </Button>
  );
};

export default function ResetPasswordForm() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';
  const [formState, dispatchResetPasswordAction] = useFormState(
    resetPassword.bind(null, token),
    EmptyFormState,
  );

  useFormToastMessage(formState);
  return (
    <Wrapper>
      <CardHeader
        title="Reset Password"
        label="Enter new password to proceed"
        Icon={RectangleEllipsis}
      />
      <CardContent>
        <form action={dispatchResetPasswordAction}>
          {/* password */}
          <div className="mb-6 grid gap-y-2">
            <Label htmlFor="newPassword" className="add-required">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="******"
            />
            <FieldError formState={formState} name="newPassword" />
          </div>
          <div className="mb-6 grid gap-y-2">
            <Label htmlFor="confirmPassword" className="add-required">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="******"
            />
            <FieldError formState={formState} name="confirmPassword" />
          </div>
          <ResetSubmitButton />
        </form>
      </CardContent>
    </Wrapper>
  );
}
