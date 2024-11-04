import {
  LucideProps,
  ShieldCheck,
  ShieldQuestion,
  User,
  Wrench,
} from 'lucide-react';

interface AlbumMemberTypeIconProps extends Omit<LucideProps, 'ref'> {
  type: 'OWNER' | 'MEMBER' | 'CONTRIBUTOR';
}

export default function AlbumMemberTypeIcon({
  type,
  ...props
}: Readonly<AlbumMemberTypeIconProps>) {
  const getAlbumMemberTypeIcon = () => {
    switch (type) {
      case 'OWNER':
        return <ShieldCheck {...props} />;
      case 'MEMBER':
        return <User {...props} />;
      case 'CONTRIBUTOR':
        return <Wrench {...props} />;
      default:
        return <ShieldQuestion {...props} />;
    }
  };

  return <>{getAlbumMemberTypeIcon()}</>;
}
