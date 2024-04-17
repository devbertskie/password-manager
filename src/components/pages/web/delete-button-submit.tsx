import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      {pending ? 'Deleting ...' : 'Delete'}
    </Button>
  );
};

export default DeleteButton;
