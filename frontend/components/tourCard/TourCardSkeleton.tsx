
const TourCardSkeleton = () => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg animate-pulse">
      <div className="p-0 relative">
        <div className="relative h-64 overflow-hidden bg-gray-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="h-6 bg-gray-400 rounded mb-2 w-3/4" />
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full" />
            <div className="h-4 bg-gray-400 rounded w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;
