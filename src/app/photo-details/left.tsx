'use client';
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Image from "next/image";
import { XIcon } from "lucide-react"
import { useRouter } from "next/navigation";

export default function Left() {
  const route = useRouter();

  const handleCloseClick = () => {
    route.back();
  }

  return (
      <div className="relative flex items-center justify-center bg-black w-full h-screen group">
        <div className="inline-block items-center justify-center overflow-hidden">
          <img 
            src="https://placehold.co/1200x400" 
            alt="Post image" 
            className="max-h-screen max-w-full object-contain"
          />
        </div>

        <button className="absolute left-2 opacity-0 hover: group-hover:opacity-100 transition-opacity rounded-full hover:bg-gray-800">
          <ChevronLeft className="h-10 w-10" />
        </button>

        <button className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-gray-800">
          <ChevronRight className="h-10 w-10" />
        </button>

        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-800">
          <Expand className="h-6 w-6" />
        </button>

        <button onClick={handleCloseClick}>
          <XIcon className="h-10 w-10 absolute top-2 left-2 p-2 rounded-full hover:bg-gray-800" />
        </button>
      </div>
  );
}