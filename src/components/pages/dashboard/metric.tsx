import React, { ElementType } from 'react';

export interface MetricProps {
  label: string;
  description: string;
  icon: ElementType;
  count: number;
}

const Metric = ({ label, description, icon: Icon, count }: MetricProps) => {
  return (
    <div className="flex items-start justify-between border p-6 md:w-[300px]">
      <div className="tracking-wider">
        <p className="text-lg uppercase">{label}</p>
        <h1 className="font-space text-2xl font-bold text-primary">{count}</h1>
        <p className="text-[12px] text-muted-foreground">{description}</p>
      </div>
      <Icon className="size-5 text-primary" />
    </div>
  );
};

export default Metric;
