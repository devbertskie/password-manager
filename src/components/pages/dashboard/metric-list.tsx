import React from 'react';
import Metric, { MetricProps } from '@/components/pages/dashboard/metric';
import { Globe, Mail, NotepadText } from 'lucide-react';
import { usersWithCount } from '@/actions';
import { notFound } from 'next/navigation';

const MetricList = async () => {
  const usersDataCount = await usersWithCount();
  if (!usersDataCount) return notFound();

  const dataItems: MetricProps[] = [];
  usersDataCount.forEach((item) => {
    if (item._count.webCredentials) {
      dataItems.push({
        count: item._count.webCredentials,
        label: 'Web Credentials',
        description: 'All web credentials added',
        icon: Globe,
      });
    }
    if (item._count.emailCredentials) {
      dataItems.push({
        count: item._count.emailCredentials,
        label: 'Email Credentials',
        description: 'All email credentials added',
        icon: Mail,
      });
    }
    if (item._count.notes) {
      dataItems.push({
        count: item._count.notes,
        label: 'All Notes',
        description: 'All notes added',
        icon: NotepadText,
      });
    }
  });

  return (
    <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-center md:gap-x-4 xl:justify-between">
      {dataItems.map((item) => (
        <Metric
          key={item.description}
          label={item.label}
          count={item.count}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default MetricList;
