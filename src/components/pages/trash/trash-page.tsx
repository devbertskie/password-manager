import { fetchAllDeletedItems } from '@/actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { CredentialType } from '@/types';
import { formatDistance } from 'date-fns';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import React, { ReactNode } from 'react';
import TrashPagination from '@/components/pages/trash/trash-pagination';
import TrashRestoreModalForm from './trash-restore-modal-form';
import TrashDeleteModalForm from './trash-delete-modal-form';

export interface TrashPageProps {
  type: CredentialType;
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

const PAGE_LIMIT = 8;

interface ITrashPageProps {
  currentPage: number;
}

const EmptyTrash = () => {
  return (
    <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-y-4">
      <Trash2 className="size-8 text-primary/10" />
      <p className="font-space text-lg text-muted-foreground/60">
        Trash is Empty
      </p>
    </div>
  );
};

const TrashPage = async ({ currentPage }: ITrashPageProps) => {
  const deletedItems = await fetchAllDeletedItems(PAGE_LIMIT, currentPage);
  let deletedItemCells: ReactNode;

  if (!deletedItems) {
    return <EmptyTrash />;
  }

  if (currentPage > deletedItems.totalPages) {
    return <EmptyTrash />;
  }

  if (deletedItems.sortedDeletedCredentials?.length === 0) {
    deletedItemCells = (
      <TableRow className="hover:bg-transparent">
        <TableCell colSpan={3}>
          <EmptyTrash />
        </TableCell>
      </TableRow>
    );
  } else {
    deletedItemCells = deletedItems.sortedDeletedCredentials?.map((item) => (
      <TableRow key={item.id}>
        <TableCell>
          <div className="font-medium">{item.title}</div>
          <div className="hidden text-xs text-muted-foreground md:inline md:text-sm">
            {formatDistance(item.updatedAt, new Date(), {
              addSuffix: true,
            })}
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge
            className={cn(
              item.type === 'Web'
                ? 'bg-primary'
                : item.type === 'Email'
                  ? 'bg-emerald-400'
                  : 'bg-yellow-400',
              'text-xs',
            )}
          >
            {item.type}
          </Badge>
        </TableCell>
        <TableCell className="md:w-[80px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                aria-haspopup="true"
                size="icon"
                className="hover:bg-transparent"
                variant="ghost"
                asChild
              >
                <>
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col items-start p-0"
            >
              <DropdownMenuLabel className="w-full bg-primary/10">
                Actions
              </DropdownMenuLabel>
              <TrashRestoreModalForm type={item.type} credentialId={item.id} />
              <TrashDeleteModalForm type={item.type} credentialId={item.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  }
  return (
    <Card className="w-full pt-4">
      <CardContent>
        <Table>
          {deletedItems.sortedDeletedCredentials.length > 0 && (
            <TableHeader>
              <TableRow className="font-space">
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
          )}
          <TableBody>{deletedItemCells}</TableBody>
        </Table>
      </CardContent>
      {deletedItems.sortedDeletedCredentials.length > 0 && (
        <CardFooter className="flex flex-row items-center border-t bg-primary/10 px-6 py-4">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>1-{deletedItems.sortedDeletedCredentials.length}</strong> of{' '}
            <strong>{deletedItems.totalItems}</strong> items
          </div>
          {deletedItems.totalPages !== 1 && (
            <TrashPagination
              href=""
              currentPageNumber={currentPage}
              totalItems={deletedItems.totalPages || 1}
            />
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default TrashPage;
