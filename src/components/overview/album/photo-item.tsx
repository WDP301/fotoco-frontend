import Link from 'next/link';
import Image from 'next/image';

type PhotoItemProps = {
  image: string;
  _id: string;
  title: string;
};

const PhotoItem = ({ image, _id, title }: PhotoItemProps) => {
  return (
    <>
      <div>
        <Link href={`/photo/${_id}`}>
          <div className={`group relative cursor-pointer`}>
            <Image
              className="object-cover rounded-lg h-full"
              src={image}
              width={1000}
              height={1000}
              // objectFit="cover"
              // objectPosition="50%,50%"
              alt={title || 'Photo'}
            />
          </div>
        </Link>
      </div>
    </>
  );
};
export default PhotoItem;
