/* eslint-disable no-case-declarations */
'use client';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

import { CredentialType } from '@/types';
import {
  fetchCredentialById,
  fetchEmailCredentialById,
  fetchNote,
} from '@/actions';
import { EmailCredential, Note, WebCredential } from '@prisma/client';

const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

interface BreadcrumbItemProps {
  fullName: string;
  path: string;
}

interface LayoutPagerProps {
  type?: CredentialType;
}

const LayoutPager = ({ type }: LayoutPagerProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemProps[]>([]);
  const pathname = usePathname();
  const params = useParams();

  const getSlugTitle = async (dynamicRoute: string): Promise<string> => {
    let existingData = null;
    switch (type) {
      case 'Web':
        existingData = (await fetchCredentialById(
          dynamicRoute,
        )) as WebCredential;
        break;
      case 'Email':
        existingData = (await fetchEmailCredentialById(
          dynamicRoute,
        )) as EmailCredential;
        break;
      case 'Note':
        existingData = (await fetchNote(dynamicRoute)) as Note;
        break;
      default:
        existingData = null;
    }
    return existingData ? existingData.title : '';
  };
  const callbackSlutTitle = useCallback(getSlugTitle, [type]);

  useEffect(() => {
    const pathSegments = pathname.split('/').filter((item) => item !== '');
    const breadcrumbItems: BreadcrumbItemProps[] = [
      { fullName: 'Home', path: '/' },
    ];
    const dynamicRoutes = Object.values(params);
    let fullPath = '';
    for (let i = 0; i < pathSegments.length; i++) {
      fullPath += `/${pathSegments[i]}`;

      if (
        dynamicRoutes.length !== 0 &&
        dynamicRoutes.includes(pathSegments[i])
      ) {
        callbackSlutTitle(pathSegments[i]).then((title) => {
          breadcrumbItems.push({
            fullName: capitalize(title),
            path: `/${pathSegments.slice(0, i + 1).join('/')}`,
          });
          setBreadcrumbs([...breadcrumbItems]);
        });
      } else {
        breadcrumbItems.push({
          fullName: capitalize(pathSegments[i]),
          path: fullPath,
        });
      }
    }

    setBreadcrumbs(breadcrumbItems);
  }, [pathname, params, callbackSlutTitle]);

  const crumbsItem: ReactNode = breadcrumbs.map((item, index) => {
    const isDisabled = index === breadcrumbs.length - 1;
    return (
      <React.Fragment key={item.fullName}>
        <BreadcrumbItem>
          {!isDisabled ? (
            <BreadcrumbLink aria-label={`Go to ${item.fullName}`} asChild>
              <Link href={item.path}>{item.fullName}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage> {item.fullName}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {!isDisabled ? <BreadcrumbSeparator /> : null}
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{crumbsItem}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default LayoutPager;
