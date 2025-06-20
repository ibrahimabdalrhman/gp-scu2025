
const TravelCardSkeleton = () => {
  return (
    <div className="bg-white rounded-b-lg h-full animate-pulse">
      <div className="relative h-48 bg-gray-300 rounded-t-lg">
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-400 rounded-full" />
      </div>

      <div className="p-4">
        <div className="h-5 bg-gray-400 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-3" />

        <div className="flex justify-between items-center mb-3">
          <div className="h-5 bg-gray-400 rounded w-20" />
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded-full" />
            <div className="h-4 bg-gray-300 rounded w-8" />
            <div className="h-3 bg-gray-300 rounded w-6" />
          </div>
        </div>

        <div className="flex justify-between text-xs text-lightText">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <div className="h-3 bg-gray-300 rounded w-12" />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <div className="h-3 bg-gray-300 rounded w-14" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCardSkeleton;
