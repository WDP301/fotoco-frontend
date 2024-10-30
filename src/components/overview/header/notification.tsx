'use client';

import { Bell, Dot } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, UserNotification } from '@/lib/define';
import { useCallback, useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getUserNotifications, markNotificationAsSeen } from '@/lib/action';
import {
  cn,
  getFormatDistanceToNow,
  getPath,
  interpolateString,
} from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useLanguage } from '@/components/provider/language-provider';
import { useSocket } from '@/hooks/use-socket';

export default function Notification({ user }: { user: User }) {
  const router = useRouter();
  const socket = useSocket();
  const { dict } = useLanguage();
  const [notification, setNotification] = useState<UserNotification[]>([]);

  const handleSeenNoti = useCallback(
    async (noti: UserNotification) => {
      setNotification((prevNotifications) =>
        prevNotifications.map((notificationItem) => {
          if (notificationItem._id === noti._id) {
            if (notificationItem.seen.includes(user._id))
              return notificationItem;
            notificationItem.seen.push(user._id);
            return notificationItem;
          }
          return notificationItem;
        })
      );
      await markNotificationAsSeen(noti._id);
    },
    [setNotification, user._id]
  );

  useEffect(() => {
    socket?.subscribe('notification', (data) => {
      const { except, notification } = data;

      if (except !== user._id) {
        const { content } = notification;
        setNotification((prevNotifications) => [
          notification,
          ...prevNotifications,
        ]);
        toast(
          interpolateString(dict.noti.toast.title, {
            fullName: content.from.fullName,
            username: content.from.username,
          }),
          {
            description: interpolateString(getPath(dict, content?.text), {
              fullName: content?.from.fullName,
            }),
            action: {
              label: 'See more',
              onClick: () => {
                handleSeenNoti(notification);
                router.push(notification.redirectUrl);
              },
            },
          }
        );
      }
    });
  }, [socket, dict, handleSeenNoti, router, user._id]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    getUserNotifications().then((data) => {
      setNotification(data);
    });
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center space-x-4 cursor-pointer">
          <div className="relative">
            <button className="focus:outline-none flex items-center">
              <Bell size={24} />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {notification?.filter((noti) => !noti.seen.includes(user._id))
                .length > 9
                ? '9+'
                : notification?.filter((noti) => !noti.seen.includes(user._id))
                    .length}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[25rem]">
        <DropdownMenuLabel>{dict.noti.myNotifications}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-72 rounded-md p-2 pl-0">
          {notification?.length === 0 && (
            <div className="flex items-center justify-center h-72">
              {dict.noti.noNotification}
            </div>
          )}
          {notification?.map((noti, index) => (
            <Link
              href={noti.redirectUrl}
              key={index}
              onClick={() => handleSeenNoti(noti)}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className="pl-0">
                  <div className="flex justify-start items-center">
                    <Dot
                      size={30}
                      className={cn(
                        !noti.seen.includes(user._id)
                          ? 'text-primary'
                          : 'text-background'
                      )}
                    />
                    <div
                      className={cn(
                        'flex flex-col',
                        noti.seen.includes(user._id) && 'text-slate-600'
                      )}
                    >
                      <div className="flex gap-2">
                        <Avatar className="border-solid border-sky-500 border-2 w-[40px] h-[40px]">
                          <AvatarImage
                            src={
                              noti?.content?.from?.img || '/avatar/noavatar.png'
                            }
                            alt="picture"
                          />
                          <AvatarFallback>{'A'}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-around">
                          <p className="text-sm font-medium leading-none">
                            {noti?.content?.from?.fullName} (
                            {noti?.content?.from?.username})
                          </p>
                          <p className="text-xs leading-none ">
                            {noti?.content?.from?.email}
                          </p>
                        </div>
                      </div>
                      <span className="mt-2">
                        {interpolateString(getPath(dict, noti?.content?.text), {
                          fullName: noti?.content?.from.fullName,
                        })}
                      </span>

                      <div className="text-xs text-slate-400 mt-2">
                        {noti.createdAt &&
                          getFormatDistanceToNow(noti.createdAt, dict.lang)}
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </Link>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
