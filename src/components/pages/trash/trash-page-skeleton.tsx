import { Card, CardContent, CardFooter } from '@/components/ui/card';
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
const TrashPageSkeleton = () => {
  return (
    <Card className="w-full py-4">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="font-space">
              <TableHead>
                <Skeleton className="h-2.5 w-16" />
              </TableHead>
              <TableHead className="hidden sm:table-cell">
                <Skeleton className="h-2.5 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-2.5 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((__, index) => (
              <TableRow key={index}>
                <TableCell className="space-y-1">
                  <Skeleton className="h-2.5 w-16" />
                  <Skeleton className="h-2.5 w-16" />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Skeleton className="h-2.5 w-16" />
                </TableCell>
                <TableCell className="md:w-[80px]">
                  <Skeleton className="h-2.5 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <Skeleton className="h-2.5 w-16" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrashPageSkeleton;
