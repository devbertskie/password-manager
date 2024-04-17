import { AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <div className="space-x-2">
      <AlertDialogCancel disabled={pending}>Cancel</AlertDialogCancel>
      <Button type="submit" variant="destructive" size="sm" disabled={pending}>
        {pending && <Loader2 className="size-4 animate-spin" />}
        <span className={`${pending ? 'ml-2' : null}`}>
          {pending ? 'Deleting...' : 'Delete'}
        </span>
      </Button>
    </div>
  );
};

export default DeleteButton;
