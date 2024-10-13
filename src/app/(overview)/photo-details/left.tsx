import { ChevronLeft, ChevronRight, Fullscreen } from "lucide-react";
import Image from "next/image";

export default function Left() {
    return (
        <div className="flex items-center justify-center bg-black w-full h-screen">
  <div className="relative inline-block max-h-screen">
    {/* Hình ảnh */}
    <div className="flex items-center justify-center overflow-hidden">
      <img 
        src="https://placehold.co/600x400" 
        alt="Post image" 
        className="max-h-screen max-w-full object-contain"
      />
    </div>

    {/* Nút mũi tên trái */}
    <button className="absolute top-1/2 left-2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-200">
      <ChevronLeft className="h-6 w-6" />
    </button>

    {/* Nút mũi tên phải */}
    <button className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 bg-white rounded-full shadow hover:bg-gray-200">
      <ChevronRight className="h-6 w-6" />
    </button>

    {/* Nút phóng to */}
    <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-gray-200">
      <Fullscreen className="h-6 w-6" />
    </button>
  </div>
</div>


    );
}