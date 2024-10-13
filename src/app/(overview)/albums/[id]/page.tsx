import AlbumNotFound from '@/components/overview/album/album-not-found';
import BreadcrumbComponent from '@/components/shared/breadcrumb-component';
import SortSelect from '@/components/shared/sort-select';
import SpinLoading from '@/components/shared/spin-loading';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { getAlbumInfo } from '@/lib/data';
import { BreadItem, SearchPhotoParams, SortOption } from '@/lib/define';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
  searchParams: SearchPhotoParams;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const album = await getAlbumInfo(params.id);

  if (!album) {
    return {
      title: 'Album not found',
      description: 'Album not found',
    };
  }

  return {
    title: `${album.title}`,
    description: `${album.title} - ${album.description}`,
  };
}

// export default async function AlbumPage({
//     params,
//     searchParams,
// }: {
//     params: { id: string };
//     searchParams: SearchPhotoParams;
// }) {
//     const { id } = params;

//     const album = await getAlbumInfo(id);
//     const dict = await getDictionary();

//     if (!album?._id) {
//         return <AlbumNotFound />;
//     }

//     const selectOptions = [
//       {
//         label: dict.sortOptions.newest,
//         value: 'desc',
//         field: 'sort',
//       },
//       {
//         label: dict.sortOptions.oldest,
//         value: 'asc',
//         field: 'sort',
//       },
//     ] as SortOption[];

//     const breadItems = [
//         {
//             title: 'Group',
//             url: '/group',
//         },
//         {
//             title: album?.group?.title || 'Unknown',
//             url: `/groups/${album?.group?._id}`,
//         },
//         {
//             title: album?.title,
//             url: `/albums/${album?._id}`,
//         },
//     ] as BreadItem[];

//     return (
//         <section>
//             <div>
//                 <div className="my-2">
//                     <BreadcrumbComponent breadcrumbs={breadItems} />
//                 </div>

//                 <div className="flex justify-between">
//                     <h1 className="text-4xl font-bold" id="album-name">
//                         <BasicTooltip title={`Album: ${album.title}`} />
//                     </h1>
//                     <div className="flex justify-between">
//                         {/* <PhotoUploadDialog albumId={id} /> */}
//                         <PhotoUploadDialog albumId={id} />
//                         <AlbumSettingDialog album={album} />
//                     </div>
//                 </div>

//                 <div className="flex justify-between">
//                     <div className="flex gap-2 items-center">
//                         <SortSelect
//                             sort={searchParams.sort}
//                             options={selectOptions}
//                             url={`/album/${id}`}
//                         />
//                         <div>
//                             {searchParams.search && (
//                                 <SearchBadge query={searchParams.search} />
//                             )}
//                         </div>
//                     </div>
//                     <ToggleView />
//                 </div>

//                 {searchParams.mode === 'gallery' ? (
//                     <Dialog>
//                         <DialogTrigger asChild className="cursor-pointer">
//                             <div className="w-full flex justify-center mt-5">
//                                 <Button>Open Gallery</Button>
//                             </div>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[1000px] p-0 bg-transparent border-none shadow-none">
//                             <Suspense
//                                 key={
//                                     searchParams.page ||
//                                     '1' +
//                                         searchParams.sort +
//                                         searchParams.pageSize
//                                 }
//                                 fallback={<SpinLoading />}
//                             >
//                                 <GalleryView
//                                     _id={id}
//                                     searchParams={searchParams}
//                                 />
//                             </Suspense>
//                         </DialogContent>
//                     </Dialog>
//                 ) : (
//                     <Suspense
//                         key={
//                             searchParams.page ||
//                             '1' + searchParams.sort + searchParams.pageSize
//                         }
//                         fallback={<SpinLoading />}
//                     >
//                         <PhotoList _id={id} searchParams={searchParams} />
//                     </Suspense>
//                 )}

//                 {/* <SearchForm commands={commands} /> */}
//                 {/* <GalleryGrid images={results.resources} /> */}
//             </div>
//         </section>
//     );
// }

export default async function AlbumPage() {
  return (
    <div>
      <AlbumNotFound />
    </div>
  );
}
