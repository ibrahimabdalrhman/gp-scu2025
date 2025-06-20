import React, { useEffect, useState } from "react";
import { Star, Users } from "lucide-react";
import Image from "next/image";
import { IStayType } from "@/types";
import { useSendData } from "@/hooks/useSendData";
import toast from "react-hot-toast";
import { useFetchData } from "@/hooks/useFetchData";

const TravelCard = ({
  images,
  name,
  description,
  country,
  price,
  ratingsAverage,
  ratingsQuantity,
  availableRooms,
  coverImage,
  type,
  _id,
  availableStatus,
}: IStayType) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { data: wishlist } = useFetchData("/wishlist", "wishlist");
  const { mutateAsync, isPending, isSuccess } = useSendData(
    `/wishlist/${_id}`,
    "patch"
  );

  useEffect(() => {
    if (wishlist) {
      const foundInWishlist = wishlist.some((item: any) => item._id === _id);
      setIsInWishlist(foundInWishlist);
    }
  }, [wishlist, _id]);
  const handleWishlist = async () => {
    try {
      const response = await mutateAsync({});
      const updatedWishlist = response?.data?.wishlist || [];
      const foundInWishlist = updatedWishlist.some((w: any) => w._id === _id);

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
    <div className="bg-white rounded-b-lg h-full">
      <div className="relative h-48">
        <div className="relative">
          <Image
            src={coverImage?.trim() || (images && images.length > 0 ? images[0]?.trim() : "")}
            alt={name || "Travel Card Image"}
            loading="lazy"
            width={300}
            height={300}
            className="w-full h-full object-cover aspect-[16/9]"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        {type && <div className="pop">{type}</div>}
        <button
            aria-label="Bookmark"
            className="absolute top-3 right-3 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-1.5 rounded-full"
            onClick={(e)=>{
              e.stopPropagation();
              e.preventDefault();
              handleWishlist(); 
            }}
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
      </div>

      <div className="p-4">
        <div>
          <h3 className="font-bold text-lg mb-2">{name}</h3>
          <p className="text-sm text-lightText mb-3">{country}</p>
          <p className="text-sm text-lightText mb-3 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-lg font-bold">${price}</span>
            <span className="text-sm text-lightText">/person</span>
          </div>
          <div className="flex items-center">
            <Star size={16} color="gold" fill="gold" />
            <span className="text-sm ml-1">{ratingsAverage?.toFixed(1)}</span>
            <span className="text-xs ml-1">({ratingsQuantity})</span>
          </div>
        </div>

        <div className="flex justify-between text-xs text-lightText">
          <div className="flex items-center">
            <span>available rooms: {availableRooms}</span>
          </div>
          <div className="flex items-center">
            <span
              className={availableStatus ? "text-secondary font-medium" : "text-red-500"}
            >
              {availableStatus ? "Available" : "Unavailable"}
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;
