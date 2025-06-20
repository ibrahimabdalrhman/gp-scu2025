
const TestimonialCardSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-lg testimonial-card animate-pulse">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-300 rounded" />
        ))}
      </div>

      <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
      <div className="h-4 bg-gray-300 rounded mb-2 w-5/6" />
      <div className="h-4 bg-gray-300 rounded mb-4 w-4/6" />

      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
        <div>
          <div className="h-4 bg-gray-400 rounded w-24 mb-2" />
          <div className="h-3 bg-gray-300 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardSkeleton;
