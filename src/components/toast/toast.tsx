import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';
import { Icons } from '../icons/icons';

type ToasterProps = React.ComponentProps<typeof Toaster>;

export default function Toast() {
  const { theme = 'system' } = useTheme();
  console.log('theme:', theme);
  return (
    <Toaster
      position="bottom-left"
      richColors
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        closeButton: true,
      }}
      icons={{
        error: <CircleAlert className="w-5 h-5" />,
        info: <Info className="w-5 h-5" />,
        success: <CircleCheck className="w-5 h-5" />,
        warning: <TriangleAlert className="w-5 h-5" />,
        loading: <Icons.spinner className="w-5 h-5" />,
      }}
    />
  );
}
