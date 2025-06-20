import { Coffee, Wifi, Star } from 'lucide-react';

const Amenities = () => (
  <div className="container py-6 md:py-16">
      <h2 className="heading-two  text-center">Premium Amenities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="bg-amber-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Coffee className="h-8 w-8 text-amber-700" />
          </div>
          <h3 className="font-semibold mb-2">Fine Dining</h3>
          <p className="text-gray-600">Experience our award-winning restaurant featuring local and international cuisine.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Wifi className="h-8 w-8 text-indigo-700" />
          </div>
          <h3 className="font-semibold mb-2">High-Speed WiFi</h3>
          <p className="text-gray-600">Stay connected with complimentary high-speed internet access throughout the hotel.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <div className="bg-rose-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Star className="h-8 w-8 text-rose-700" />
          </div>
          <h3 className="font-semibold mb-2">Wellness Center</h3>
          <p className="text-gray-600">Rejuvenate at our spa and fitness center with professional services and equipment.</p>
        </div>
      </div>
  </div>
);

export default Amenities;
