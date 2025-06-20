import React from 'react';
import { Calendar } from 'lucide-react';

const History = () => (
  <div className="md:py-16 py-6 container">
    <div className="p-6">
      <h2 className="heading-two text-center">Our Journey</h2>
      <div className="space-y-8 mt-12">
        {[{
          year: "2005", 
          title: "Foundation", 
          description: "Our journey began with a vision to create a hotel that combines luxury with authentic hospitality."
        },
        {
          year: "2010", 
          title: "First Expansion", 
          description: "We expanded to include a luxury wing with additional rooms, a conference center, and our signature restaurant."
        },
        {
          year: "2023", 
          title: "Modern Renovation", 
          description: "We completed a renovation incorporating sustainable technologies and modern design while preserving our classic charm."
        }].map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/4 flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-purple-700" />
              </div>
              <span className="font-bold text-xl mt-2">{item.year}</span>
            </div>
            <div className="md:w-3/4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default History;
