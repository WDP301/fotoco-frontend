import { ChevronLeft, ChevronRight, Fullscreen } from "lucide-react";
import Image from "next/image";

export default function Left() {
    return (
        <div className="relative flex items-center justify-center bg-black w-full h-screen group">
            <div className="inline-block items-center justify-center overflow-hidden">
              <img 
                src="https://placehold.co/600x400" 
                alt="Post image" 
                className="max-h-screen max-w-full object-contain"
              />
          </div>

            <button className="absolute left-2 opacity-0 hover: group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-800">
              <ChevronLeft className="h-10 w-10" />
            </button>

            <button className="absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-800">
              <ChevronRight className="h-10 w-10" />
            </button>
            <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-800">
              <Fullscreen className="h-7 w-7" />
            </button>
        </div>
    );
}