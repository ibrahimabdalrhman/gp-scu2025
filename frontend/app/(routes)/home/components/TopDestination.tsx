"use client";
import TravelCard from "@/components/hotelCard/TravelCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useFetchData } from "@/hooks/useFetchData";
import TravelCardSkeleton from "@/components/hotelCard/TravelCardSkeleton";
import { IStayType } from "@/types";
import Link from "next/link";

const TopDestination = () => {
  const { data, isPending } = useFetchData("/hotel", "hotels");

  return (
    <section className="container md:py-16 py-6">
      <h2 className="mb-10 heading-two">Top Destinations</h2>
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          grabCursor={true}
          loop={true}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <SwiperSlide key={i}>
                  <TravelCardSkeleton />
                </SwiperSlide>
              ))
            : data?.data?.map((item: IStayType) => (
                <SwiperSlide key={item?._id}>
               <Link href={`/stays/hotel/${item._id}`}>
                  <TravelCard 
                    _id={item._id}
                    name={item.name}
                    description={item.description}
                    images={item.images}
                  />
               </Link>
                </SwiperSlide>
              ))}
        </Swiper>
        <div className="absolute top-[50%] left-0 -translate-y-1/2 w-full z-[20] md:flex items-center">
          <div className="w-[95%] mx-auto">
            <div className="flex items-center justify-between">
              <div className="next-btn group w-[50px] h-[50px] flex items-center justify-center rounded-full bg-primary hover:bg-white cursor-pointer">
                <ArrowLeft
                  aria-hidden="true"
                  className="fill-white text-white group-hover:fill-[#000] group-hover:text-[#000] transition-all duration-300 w-6 h-6"
                />
              </div>
              <div className="prev-btn group w-[50px] h-[50px] flex items-center justify-center rounded-full bg-primary hover:bg-white cursor-pointer">
                <ArrowRight
                  aria-hidden="true"
                  className="fill-white text-white group-hover:fill-[#000] group-hover:text-[#000] transition-all duration-300 w-6 h-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopDestination;