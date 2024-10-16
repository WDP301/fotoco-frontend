import PhotoItemLoading from './photo-item-loading';

export function PhotoListLoading() {
  // Define a range of possible heights for the skeletons
  const getRandomHeight = () => {
    const heights = [200, 250, 300, 350, 400];
    return heights[Math.floor(Math.random() * heights.length)];
  };
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mt-5">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          {[...Array(4)].map((_, subIndex) => (
            <PhotoItemLoading key={subIndex} randomHeight={getRandomHeight()} />
          ))}
        </div>
      ))}
    </div>
  );
}
