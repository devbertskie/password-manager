import { OptionsObject, enqueueSnackbar } from 'notistack';

export const notify = {
  success: (message: string = 'Success') =>
    enqueueSnackbar(message, { variant: 'success' }),
  warning: (message: string = 'Warning!') =>
    enqueueSnackbar(message, { variant: 'warning' }),
  error: (message: string = 'Something went wrong!') =>
    enqueueSnackbar(message, { variant: 'error' }),
  persit: (message: string, options?: OptionsObject) =>
    enqueueSnackbar(message, options),
};
