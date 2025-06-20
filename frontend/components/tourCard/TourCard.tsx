import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TourCardProps {
  name: string;
  image: string;
  hotels?: number;
}

const TourCard = ({ image, name, hotels }: TourCardProps) => {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg">
      <div className="p-0 relative">
        <div className="relative h-64 overflow-hidden">
      {
        image && (
        
              <Image
            src={image?.trim()}
            width={300}
            height={300}
            alt={name || "Tour Card Image"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )
      }
          <div className="absolute inset-0 bg-black/30 transition-opacity group-hover:opacity-50" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-2xl font-semibold mb-2">{name}</h3>
         {
          hotels && (
            <p className="text-sm flex items-center gap-2">
              <MapPin size={16} aria-hidden="true" color="gold" />
              {hotels} Hotels
            </p>
          )
         }
        </div>
      </div>
    </div>
  );
};

export default TourCard;
