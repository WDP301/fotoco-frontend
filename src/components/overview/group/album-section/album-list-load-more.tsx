'use client';
import React from 'react';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Loader2 } from 'lucide-react';
import { getAlbumsByGroupId } from '@/lib/data';
import { Album } from '@/lib/define';
import { AlbumCard } from './album-card';
import { useLanguage } from '@/components/provider/language-provider';

const AlbumList = ({ groupId }: { groupId: string }) => {
  const { dict } = useLanguage();
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [products, setProducts] = React.useState<Album[]>([]);

  const next = async () => {
    setLoading(true);

    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      const { albums } = await getAlbumsByGroupId(groupId, {
        page: page + 1,
        pageSize: 6,
      });
      setProducts((prev) => [...prev, ...albums]);
      setPage((prev) => prev + 1);

      // Usually your response will tell you if there is no more data.
      if (albums.length < 6) {
        setHasMore(false);
      }
      setLoading(false);
    }, 800);
  };
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((album) => (
        <AlbumCard key={album._id} album={album} width={200} height={200} />
      ))}
      {products.length === 0 && (
        <div className="flex justify-center items-center h-24">
          {dict.errorMessage.noAlbumFound}
        </div>
      )}
      <InfiniteScroll
        hasMore={hasMore}
        isLoading={loading}
        next={next}
        threshold={1}
      >
        {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
      </InfiniteScroll>
    </div>
  );
};

export default AlbumList;
