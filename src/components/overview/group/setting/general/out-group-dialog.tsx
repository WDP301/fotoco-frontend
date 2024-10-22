'use client';

// import { useSocket } from '@/components/socket-io-provider';
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
import { outGroup } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function OutGroupDialog({
    groupId,
    userId,
}: {
    groupId: string;
    userId: string;
}) {
    // const { socket } = useSocket();
    const router = useRouter();
    const [checkbox, setCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckboxChange = (event: any) => {
        setCheckbox(!checkbox);
    };

    const handleOutGroup = async () => {
        setIsLoading(true);
        const result = await outGroup(groupId, userId);
        if (!result?.isSuccess) {
            toast.error(result?.error);
        } else {
            // if (socket && result?.data?.receivers) {
            //     socket.emit('sendNotification', result?.data);
            // }
            toast.success(`You have left the group successfully`);
            router.refresh();
        }
        setIsLoading(false);
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Out group</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Out group</DialogTitle>
                    <DialogDescription>
                        Want to get out of the group?
                    </DialogDescription>
                </DialogHeader>
                <div className="items-top flex space-x-2">
                    <Checkbox
                        id="terms1"
                        onCheckedChange={handleCheckboxChange}
                        checked={checkbox}
                    />
                    <div className="grid gap-1.5 leading-none">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Are you sure ?
                        </label>
                        <p className="text-sm text-muted-foreground">
                            You may lose all of these memories
                        </p>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        disabled={!checkbox || isLoading}
                        variant="destructive"
                        onClick={handleOutGroup}
                    >
                        Get out
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
