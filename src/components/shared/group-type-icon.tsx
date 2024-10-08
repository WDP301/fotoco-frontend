import {
  EyeOff,
  Lock,
  LucideProps,
  ShieldQuestion,
  Users,
} from 'lucide-react';

interface GroupTypeIconProps extends Omit<LucideProps, 'ref'> {
  type: 'PUBLIC' | 'PRIVATE' | 'HIDDEN' | string;
}

export default function GroupTypeIcon({
  type,
  ...props
}: Readonly<GroupTypeIconProps>) {
  const getGroupTypeIcon = () => {
    switch (type) {
      case 'PUBLIC':
        return <Users {...props} />;
      case 'PRIVATE':
        return <Lock {...props} />;
      case 'HIDDEN':
        return <EyeOff {...props} />;
      default:
        return <ShieldQuestion {...props} />;
    }
  };

  return <>{getGroupTypeIcon()}</>;
}
