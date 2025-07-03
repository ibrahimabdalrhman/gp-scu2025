"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import TourCard from "@/components/tourCard/TourCard";
import Link from "next/link";
import { useFetchData } from "@/hooks/useFetchData";
import TourCardSkeleton from "@/components/tourCard/TourCardSkeleton";

const PopularCities = () => {
  const { data, isPending, error } = useFetchData("/city", "cities");

  return (
    <div className="container md:py-16 py-6">
      <h2 className="heading-two mb-10">Popular Cities in Egypt</h2>

      {isPending && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center">Something went wrong. Please try again later.</div>
      )}

      {!isPending && !error && data?.length > 0 && (
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="cities-swiper"
        >
          {data.map((city, index) => (
            <SwiperSlide key={index}>
              <Link href={{ pathname: "/stays", query: { city: city.name } }}>
                <TourCard name={city.name} image={city?.images?.[0]} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PopularCities;
