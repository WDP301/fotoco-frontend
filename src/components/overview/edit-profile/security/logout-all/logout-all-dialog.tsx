'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icons } from '@/components/icons/icons';
import { useLanguage } from '@/components/provider/language-provider';

export default function LogoutAllDialog() {
  const { dict } = useLanguage();
  const router = useRouter();
  const [checkbox, setCheckbox] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setCheckbox(!checkbox);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    router.push('/logout-all');
    setIsLoading(false);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">{dict.button.logoutAll}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {dict.editProfile.security.logOutAll.dialog.title}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="items-top flex space-x-2">
            <Checkbox
              checked={checkbox}
              id="terms1"
              onCheckedChange={handleCheckboxChange}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {dict.editProfile.security.logOutAll.dialog.description}
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={!checkbox || isLoading}
              onClick={handleLogout}
              variant="destructive"
            >
              {isLoading && (
                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
              )}
              {dict.button.logoutAll}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
