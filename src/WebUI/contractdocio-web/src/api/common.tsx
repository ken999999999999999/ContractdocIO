/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { SnackbarUtils } from '@/lib';
import { useAuth } from 'react-oidc-context';

export interface IError {
  status: number;
  response: string;
}

interface IResponse {
  errors: object;
}

export const handleError = (error: any): void => {
  console.log(error);
  try {
    switch (error.status) {
      case 401: {
        window.alert('The connection stage has expired, please log in again');
        const pathname = location.pathname;
        useAuth().signinRedirect({
          state: {
            returnUrl: pathname.startsWith('/authentication/') ? '/' : pathname
          }
        });
        return;
      }
      case 404:
        SnackbarUtils.warning('No related records found');
        return;
      case 403:
        SnackbarUtils.warning('Invalid Permission');
        return;
      case 500:
        SnackbarUtils.error('System error occurs, please try again later.');
        return;
      case 503:
        SnackbarUtils.warning(
          'System is undergoing maintenance, please try again later'
        );
        return;
      default:
        break;
    }
    if (!error?.response) return;
    const response = JSON.parse(error.response) as IResponse;
    const errList = response.errors || {};
    SnackbarUtils.warning(
      Object.values(errList)
        .map((msg, i) => `${i + 1} :${msg as string}`)
        .join(', ')
    );
  } catch (err) {
    SnackbarUtils.error('System error occurs, please try again later.');
  }
};
