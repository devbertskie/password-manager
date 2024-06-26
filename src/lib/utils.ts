import { RemovedUrlQueryParams, UrlQueryParams } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = ({ params, key, value, to }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);
  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: to || window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const removeKeysFromQuery = ({
  keysToRemove,
  params,
  to,
}: RemovedUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: to || window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  );
};

export const getPaginatedData = (
  totalItems: number,
  limit: number,
  currentPage: number,
) => {
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = currentPage * limit;

  return { totalPages, startIndex, endIndex };
};

export const initiateUpdate = (pathname: string) => {
  const urlQuery = formUrlQuery({
    params: '',
    key: 'updated',
    value: Date.now().toString(),
    to: pathname,
  });

  return urlQuery;
};
