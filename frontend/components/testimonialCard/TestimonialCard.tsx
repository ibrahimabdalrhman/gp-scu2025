import { ITestimonialCardProps } from '@/types';
import {  Star } from 'lucide-react';
import Image from 'next/image';


const TestimonialCard = ({ content, author, avatar, rating, location }: ITestimonialCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg testimonial-card">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            color={ i < rating ? "gold" : "gray" }
            fill={ i < rating ? "gold" : "gray" }
          />
        ))}
      </div>
      
      <p className="text-lightText text-sm mb-4 line-clamp-3">{content}</p>
      
      <div className="flex items-center">
        <Image width={40} height={40} src={avatar} loading='lazy' alt={author || "Avatar"} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h4 className="font-medium text-darkText">{author}</h4>
          <p className="text-xs text-lightText">{location}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;