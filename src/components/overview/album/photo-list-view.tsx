'use client';

import { useState, useEffect } from 'react';
import PhotoItem from './photo-item';
import { Photo } from '@/lib/define';

// Helper function to calculate the number of columns based on screen size
const getNumCols = () => {
  if (window.innerWidth >= 1280) {
    return 4; // Extra large screens: 4 columns
  } else if (window.innerWidth >= 1024) {
    return 3; // Large screens: 3 columns
  } else if (window.innerWidth >= 768) {
    return 2; // Medium screens: 2 columns
  }
  return 1; // Small screens: 1 column
};

const buildPhotoItems = (photos: Photo[], numCols: number) => {
  const items = [];
  for (let index = 1; index <= numCols; index++) {
    items.push(
      <div key={index} className="flex flex-col justify-start gap-4">
        {photos
          .filter((photo, photoIndex) => {
            return photoIndex % numCols === index - 1;
          })
          .map((filteredPhoto) => (
            <PhotoItem key={filteredPhoto._id} photo={filteredPhoto} />
          ))}
      </div>
    );
  }
  return items;
};

export default function PhotoListView({ photos }: { photos: Photo[] }) {
  const [numCols, setNumCols] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setNumCols(getNumCols());
    };

    // Set initial number of columns
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
      {buildPhotoItems(photos, numCols)}
    </div>
  );
}
