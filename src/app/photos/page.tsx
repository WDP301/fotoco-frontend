import PhotoCarousel from "@/components/overview/photo/photo-section/photo-carousel"
import { PostSection } from "../../components/overview/photo/post-section/post-section"

export default function PhotoDetailsPage() {
  return (
      <div className="max-w-screen h-screen overflow-hidden flex">
        <div className="flex flex-col justify-between w-3/4">
          <div className="w-full grid gap-1.5">
            <PhotoCarousel />
          </div>
        </div>
        <div className="flex flex-col justify-between w-1/4 p-4">
          <div className="w-full grid gap-1.5">
            <PostSection />
          </div>
        </div>
      </div>
  )
}