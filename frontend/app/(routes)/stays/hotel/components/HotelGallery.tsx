"use client";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fallbackImages = [
  "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
];

export default function HotelGallery({
  name,
  city,
  country,
  images = [], // Provide default empty array
  stayType,
  type,
  id
}: {
  id?: string;
  name?: string;
  city?: string;
  country?: string;
  images?: string[];
  stayType?: string;
  type?: string;
}) {
  // Safely combine images with fallbacks and trim whitespace
  const allImages = [...(images || []), ...fallbackImages]
    .slice(0, 10)
    .map(img => img.trim()); // Trim whitespace from all URLs

  return (
    <section className="container md:py-16 py-6">
      {/* Hotel Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h3 className="heading-three text-xl md:text-2xl font-semibold text-gray-900">
            {name || "Hotel Name"}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
            <MapPin size={16} />
            {city || "City"}, {country || "Country"}
          </p>
         
          <p className="text-gray-700 text-sm">{type || "Hotel Type"}</p>
        </div>
        <Link
          href={{pathname:"/checkout", query: {id}}}
          className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition"
        >
          Reserve a room
        </Link>
      </div>

      {/* Featured Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Image
          src={allImages[0]}
          alt="Main hotel image"
          width={800}
          height={600}
          className="w-full col-span-2 h-[300px] md:h-[600px] rounded-lg object-cover"
          loading="lazy"
        />
        <div className="grid grid-rows-2 gap-4">
          <Image
            src={allImages[1]}
            alt="Second hotel image"
            width={600}
            height={300}
            className="w-full h-[300px] rounded-lg object-cover"
            loading="lazy"
          />
          <Image
            src={allImages[2]}
            alt="Third hotel image"
            width={600}
            height={300}
            className="w-full h-[300px] rounded-lg object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Gallery Images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allImages.slice(3).map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`hotel image ${i + 1}`}
            width={400}
            height={300}
            className="w-full h-[200px] rounded-lg object-cover"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}