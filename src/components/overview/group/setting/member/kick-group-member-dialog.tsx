"use client";
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { UserMinus } from 'lucide-react';
import { Icons } from '@/components/icons/icons';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { outGroup } from '@/lib/action';
import { GroupInfo, GroupMember, User } from '@/lib/define';
// import { useSocketClient } from '@/components/provider/socket-io-provider';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export function KickGroupMemberDialog({
    groupId,
    userId,
}: {
    groupId: string;
    userId: string;
}) {
    // const { socket } = useSocketClient();
    const router = useRouter();
    const [checkbox, setCheckbox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<
        { error?: string; errorType?: string; isSuccess?: boolean } | undefined
    >(undefined);

    const handleCheckboxChange = (event: any) => {
        setCheckbox(!checkbox);
    };

    const handleKickMember = async () => {
        setIsLoading(true);
        const result = await outGroup(groupId, userId);
        if (!result?.isSuccess) {
            setResult(result);
        } else {
            // if (socket && result?.data?.receivers) {
            //     socket.emit('sendNotification', result?.data);
            // }
            toast.success('There is an imposter among us');
            setResult({ isSuccess: true });
            router.refresh();
        }
        setIsLoading(false);
    };
    return (
        <>
            {result?.error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{result.error}</AlertDescription>
                </Alert>
            )}
            <Dialog>
                <DialogTrigger asChild>
                    <div className=" w-full flex justify-between relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground">
                        <div>Kick</div>
                        <UserMinus className="w-5 h-5" />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Kick this people</DialogTitle>
                        <DialogDescription>
                            This person may have relationship with the group,
                            are you sure to kick this person?
                        </DialogDescription>
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
                                Are you sure ?
                            </label>
                            <p className="text-sm text-muted-foreground">
                                You may miss him/her
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={!checkbox || isLoading}
                            onClick={handleKickMember}
                            variant="destructive"
                        >
                            {isLoading && (
                                <Icons.spinner className=" mr-2 h-4 w-4 animate-spin" />
                            )}
                            Kick
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
