"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Grid } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import { stayTypes } from "@/data";
import { IStayType, IStayTypeItem } from "@/types";
import TourCard from "@/components/tourCard/TourCard";
import Link from "next/link";

const ExploreStays = () => {
  return (
    <section className="container md:py-16 py-6" id="stays">
      <div className="relative">
        <h2 className="heading-two mb-10">Explore Types of Stays</h2>

        <Swiper
          modules={[Autoplay, Grid]}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          grid={{ rows: 2, fill: "row" }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="stays-swiper"
        >
          {stayTypes.map((stay: IStayTypeItem, index) => (
            <SwiperSlide key={index}>
              <Link
                href={{ pathname: "/stays", query: { stayType: stay.title } }}
                className="block"
              >
                <TourCard
                  name={stay.name}
                  image={stay.image}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExploreStays;