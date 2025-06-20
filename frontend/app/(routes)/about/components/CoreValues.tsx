import React from 'react';
import { Users, MapPin } from 'lucide-react';

const CoreValues = () => (
  <div className="container py-6 md:py-16 ">
      <h2 className="heading-two  text-center">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
        <div className="flex items-start space-x-4">
          <div className="bg-white rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0">
            <Users className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h4 className="heading-four mb-2">Exceptional Service</h4>
            <p className="text-gray-600">We prioritize our guests' needs and maintain the highest standards in every aspect of our service, ensuring your comfort and satisfaction.</p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center shrink-0">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h4 className="heading-four mb-2">Perfect Location</h4>
            <p className="text-gray-600">Situated in the heart of the city, our hotel provides easy access to major attractions, business districts, and transportation hubs.</p>
          </div>
        </div>
      </div>
  </div>
);

export default CoreValues;
