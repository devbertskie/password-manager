import { toast } from 'sonner';

export const notify = {
  success: (message: string = 'Success') => toast.success(message),
  warning: (message: string = 'Warning!') => toast.warning(message),
  error: (message: string = 'Something went wrong!') => toast.error(message),
};
