import PhotoNotFound from "@/components/overview/photo/photo-not-found";
import PhotoCarousel from "@/components/overview/photo/photo-section/photo-carousel"
import PostSection from "@/components/overview/photo/post-section/post-section"
import { siteConfig } from "@/config/site";
import { getPhotoDetails } from "@/lib/data";
import { SearchPhotoParams } from "@/lib/define";
import { getDictionary } from "@/lib/dictionaries";
import { Metadata } from "next";

type Pros = {
  params: {id: string};
  searchParams: SearchPhotoParams
}

export async function generateMetadata({
  params,
  searchParams,
}: Pros): Promise<Metadata> {
  const dict = await getDictionary();
  const photo = await getPhotoDetails(params.id, searchParams);
  if (!photo || !photo.photo._id) {
    return {
      title: "Photo Not Found",
      description: "Photo Not Found",
    };
  }

  return {
    title: {
      default: `${photo.photo.title ? photo.photo.title : "Photo"} | ${photo.photo.owner.fullName} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: dict.auth.description,
  }
}
export default async function PhotoDetailsPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchPhotoParams
}) {

  const photo = await getPhotoDetails(params.id, searchParams);
  if (!photo || !photo.photo._id) {
    return <PhotoNotFound />
  }  

  return (
      <div className="max-w-screen h-screen overflow-hidden flex">
        <div className="flex flex-col justify-between w-3/4">
          <div className="w-full grid gap-1.5">
            <PhotoCarousel photo={photo} searchParams={searchParams}/>
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/4 p-4">
          <div className="w-full grid gap-1.5">
            <PostSection photo = {photo} />
          </div>
        </div>
      </div>
  )
}