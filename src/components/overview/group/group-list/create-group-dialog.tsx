'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CreateGroupForm from './create-group-form';
import { useLanguage } from '@/components/provider/language-provider';
import { useState } from 'react';

export default function CreateGroupDiaLog({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { dict } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dict.createGroup.dialogTitle}</DialogTitle>
          <DialogDescription>
            {dict.createGroup.dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <CreateGroupForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
