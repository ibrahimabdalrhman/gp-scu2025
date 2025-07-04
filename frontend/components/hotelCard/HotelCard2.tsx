import React, { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IStayType } from "@/types";
import { useSendData } from "@/hooks/useSendData";
import toast from "react-hot-toast";
import { useFetchData } from "@/hooks/useFetchData";

const HotelCard2 = ({
  id,
  city,
  country,
  coverImage,
  description,
  name,
  price,
  priceAfterDiscount,
  ratingsAverage,
  ratingsQuantity,
  type,
  stayType,
}: IStayType) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { data: wishlist } = useFetchData("/wishlist", "wishlist");
  const { mutateAsync, isPending, isSuccess } = useSendData(
    `/wishlist/${id}`,
    "patch"
  );

  useEffect(() => {
    if (wishlist) {
      const foundInWishlist = wishlist.some((item: any) => item._id === id);
      setIsInWishlist(foundInWishlist);
    }
  }, [wishlist, id]);

  const handleWishlist = async () => {
    try {
      const response = await mutateAsync({});
      const updatedWishlist = response?.data?.wishlist || [];
      const foundInWishlist = updatedWishlist.some((w: any) => w._id === id);

      setIsInWishlist(foundInWishlist);
      toast.success(
        foundInWishlist ? "Added to wishlist" : "Removed from wishlist"
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update wishlist");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4 flex-wrap">
        {/* Left side - Image */}
        <div className="relative w-72 h-48 flex-shrink-0">
          <div className="relative w-full h-full ">
            <Image
              src={coverImage?.trim()}
              alt={name || "Hotel Image"}
              fill
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg" />
          </div>
          <button
            aria-label="Bookmark"
            className="absolute top-3 right-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-1.5 rounded-full"
            onClick={handleWishlist}
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isInWishlist ? "red" : "none"}
                stroke={isInWishlist ? "red" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isInWishlist ? "text-red-500 " : "text-white"}
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            )}
          </button>
          {type && <div className="pop">{type}</div>}
        </div>

        {/* Right side - Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="heading-four text-primary mb-1">{name}</h3>
              <p className="text-base text-gray-800 mb-1">{description}</p>
              <p className="text-sm text-gray-600 hover:underline cursor-pointer">
                {country},{" "}
                {city}
              </p>
              <div className="flex items-center gap-2">
                {stayType &&
                  stayType.map((type: string, index: number) => (
                    <p key={index} className="font-medium text-secondary">
                      {type}
                    </p>
                  ))}
              </div>

         
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded-lg">
                <span className="font-bold">{ratingsAverage?.toFixed(1)}</span>
                <div className="flex">
                  {ratingsAverage &&
                    Array(Math.floor(ratingsAverage))
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill="currentColor"
                          className="text-yellow-400"
                        />
                      ))}
                </div>
              </div>
              <span className="text-sm text-gray-600 mt-1">
                {ratingsQuantity} reviews
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex justify-between items-end">
              <div>
                <div className="text-sm font-medium text-green-600 mb-1">
                  Free cancellation
                </div>
                <div className="text-sm font-medium text-green-600">
                  No prepayment needed
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 line-through">
                  EGP {priceAfterDiscount?.toFixed(2)}
                </div>
                <div className="text-2xl font-bold text-black">
                  {price?.toFixed(2)}
                </div>
          
                <Link href={`stays/hotel/${id}`} className="mt-2 block btn-v-1">
                  See availability
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard2;
