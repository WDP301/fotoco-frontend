import {
  EyeOff,
  Lock,
  LucideProps,
  ShieldCheck,
  ShieldQuestion,
  User,
  Users,
} from 'lucide-react';

interface GroupMemberTypeIconProps extends Omit<LucideProps, 'ref'> {
  type: 'OWNER' | 'MEMBER';
}

export default function GroupMemberTypeIcon({
  type,
  ...props
}: Readonly<GroupMemberTypeIconProps>) {
  const getGroupMemberTypeIcon = () => {
    switch (type) {
      case 'OWNER':
        return <ShieldCheck {...props} />;
      case 'MEMBER':
        return <User {...props} />;
      default:
        return <ShieldQuestion {...props} />;
    }
  };

  return <>{getGroupMemberTypeIcon()}</>;
}
