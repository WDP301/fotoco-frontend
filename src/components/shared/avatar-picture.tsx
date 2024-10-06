import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AvatarPictureProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function AvatarPicture({
  src,
  alt = 'avatar picture',
  className,
}: AvatarPictureProps) {
  return (
    <Avatar
      className={cn(
        'border-solid border-primary border-2 w-[40px] h-[40px]',
        className
      )}
    >
      <AvatarImage src={src || '/avatar/noavatar.png'} alt={alt} />
      <AvatarFallback>{'A'}</AvatarFallback>
    </Avatar>
  );
}
