'use client'

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Icons } from '../icons/icons';
import { Facebook, FacebookIcon } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { openCenteredWindowPopup } from '@/lib/utils';
import { oauthSuccess } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const OtherOauth = () => {
  const router = useRouter();
  const [isConnecting, setIsConnecting] = useState('');
  let intervalCheckConnect: NodeJS.Timeout | null = null;

  const handleAuth = (provider: string) => {
    let url = `${siteConfig.baseApiURL}`;
    switch (provider) {
      case 'google':
        url = `${url}/auth/google`;
        break;
      case 'facebook':
        url = `${url}/auth/facebook`;
        break;
      default:
        break;
    }

    setIsConnecting(provider);
    const popup = openCenteredWindowPopup(url);

    intervalCheckConnect = setInterval(() => {
      if (popup?.closed) resetConnect();
      if (popup) {
        try {
          const urlObject = new URL(popup.window.location.href)
          const searchParams = Object.fromEntries(urlObject.searchParams.entries())
          if (urlObject.host == window.location.host) {
            try {
              if (searchParams.provider !== provider) {
                throw new Error('Invalid provider');
              }
              if (searchParams.error) {
                throw new Error(searchParams.error);
              }
              const { signature, accessToken, refreshToken } = searchParams;
              if (!signature || !accessToken || !refreshToken) {
                throw new Error('Invalid data response');
              }

              oauthSuccess(signature, accessToken, refreshToken)
            } catch (error: any) {
              toast.error(error.message);
            } finally {
              popup.close();
              resetConnect();
            }
          }
        } catch (error) { }  // catch error of not same host
      }
    }, 500);
  }

  const resetConnect = () => {
    setIsConnecting('');
    if (intervalCheckConnect) {
      clearInterval(intervalCheckConnect);
      intervalCheckConnect = null;
    }
  }

  return (
    <div className="flex space-x-4">
      <Button variant="outline" className="flex-1" onClick={() => handleAuth('google')}>
        {
          isConnecting === 'google' &&
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        }
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" className="flex-1" onClick={() => handleAuth('facebook')}>
        {
          isConnecting === 'facebook' &&
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        }
        <FacebookIcon className="mr-2 h-4 w-4" />
        Facebook
      </Button>
    </div>
  );
}

export default OtherOauth;
