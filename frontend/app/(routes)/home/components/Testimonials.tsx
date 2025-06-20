"use client";
import TestimonialCard from "@/components/testimonialCard/TestimonialCard";
import { testimonialsData } from "@/data";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ITestimonialCardProps } from "@/types";
const Testimonials = () => {
  return (
    <section className="container md:py-16 py-6">
      <h2 className="heading-two  mb-10">What People Say</h2>
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
          // navigation={{
          //   nextEl: ".next-testimonial",
          //   prevEl: ".prev-testimonial",
          // }}
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
          {testimonialsData.map((data :ITestimonialCardProps , index) => (
            <SwiperSlide key={index}>
              <TestimonialCard {...data} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div className="absolute top-[50%] left-0 -translate-y-1/2 w-full z-[20] md:flex items-center ">
            <div className="flex items-center justify-between w-full">
              <div className="next-testimonial w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-md hover:bg-white/50 cursor-pointer">
                <ArrowLeft aria-hidden="true" color="#1e1e1e" />
              </div>
              <div className="prev-testimonial w-[50px] h-[50px] flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-md hover:bg-white/50 cursor-pointer">
                <ArrowRight aria-hidden="true" color="#1e1e1e" />
              </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
